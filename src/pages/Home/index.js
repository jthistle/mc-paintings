/*
 *  Copyright (C) 2019 James Thistlewood
 *
 *  This program is free software; you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation; either version 2 of the License, or
 *  (at your option) any later version.
 *
 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License along
 *  with this program; if not, write to the Free Software Foundation, Inc.,
 *  51 Franklin Street, Fifth Floor, Boston, MA 02110-1301 USA.
 */

import React, { useState } from 'react';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

import Layout, { Column } from '../../components/Layout';
import { c_INACTIVE } from '../../theme';
import UploadInput from '../../components/UploadInput';
import Cropper from '../../components/Cropper';
import ImageSize from '../../components/ImageSize';
import Warning from '../../components/Warning';
import Button from '../../components/Button';
import DownloadView from '../../components/DownloadView';
import FinishView from '../../components/FinishView';
import ReactGA from '../../analytics';
import fileBuilders from './fileBuilders';

import { SIZES } from './configs';
import DEFAULT_PACK_META from './defaultMeta';

const ImagePlaceHolder = ({ needsImage }) => (
  <div className="placeholder">
    {needsImage ? 'Upload an image' : 'Choose a size to begin'}
    <style jsx>{`
      .placeholder {
        width: 100%;
        height: 60vh;
        background: ${c_INACTIVE};
        text-align: center;
        line-height: 60vh;
        border-radius: 0.25rem;
      }
    `}</style>
  </div>
);

/*
 *  Given a size string, return a float aspect ratio
 */
function sizeToAspect(size) {
  const [width, height] = size.split('x').map((val) => parseInt(val));
  return width / height;
}

/*
 *  Generate an initial object for any of the configuration maps.
 */
function generateInitial() {
  let initial = {};
  Object.keys(SIZES).forEach((size) => {
    initial[size] = Array(SIZES[size]).fill(undefined);
  });
  return initial;
}

const Home = () => {
  // current image to use { size: string, index: int }, falsy if none selected
  const [selectedSize, setSelectedSize] = useState();
  // the current opened menu (size string), falsy if none open
  const [openedMenu, setOpenedMenu] = useState();

  /*
   *  These all hold info about the current set of images being manipulated.
   *    textureImages: the cropped images that will be used as painting textures
   *    uploadedImages: the uncropped uploaded images that can be manipulated
   *    cropConfigs: the initial crop settings to be used when returning to images
   */
  const [textureImages, setTextureImages] = useState(generateInitial());
  const [uploadedImages, setUploadedImages] = useState(generateInitial());
  const [cropConfigs, setCropConfigs] = useState(generateInitial());

  /*
   *  The warning object. Falsy displays no warning. Should be formatted as:
   *    {
   *      title: string,
   *      message: string,
   *      onAccept: function,
   *      onReject: function,
   *    }
   */
  const [warning, setWarning] = useState();

  /*
   *  Data relating to how to form the resource pack. Format:
   *    {
   *      name: string,
   *      description: string,
   *      packFormat: int || [int, int, int] for bedrock
   *      resolution: int,
   *      fileBuilder: function,
   *      extension: string,
   *      versionTag: string
   *    }
   */
  const [packMeta, setPackMeta] = useState({});

  const [showDownloadView, setShowDownloadView] = useState(false);
  const [showResolutionSelect, setShowResolutionSelect] = useState(false);
  const [showSupportView, setShowSupportView] = useState(false);

  const onCropChange = (event) => {
    if (!selectedSize) return;

    let newConfigs = { ...cropConfigs };
    newConfigs[selectedSize.size][selectedSize.index] = event.crop;
    setCropConfigs(newConfigs);
  };

  const onCropComplete = (event) => {
    if (!selectedSize) return;

    let newTextureImages = { ...textureImages };
    newTextureImages[selectedSize.size][selectedSize.index] =
      event.croppedImage;
    setTextureImages(newTextureImages);
  };

  /*
   *  Callback for when the upload of an image has finished.
   */
  const onImageUpload = (event) => {
    if (!selectedSize) return;

    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      let imageData = event.target.result;

      let newUploadedImages = { ...uploadedImages };
      newUploadedImages[selectedSize.size][selectedSize.index] = imageData;
      setUploadedImages(newUploadedImages);

      // Reset the crop config for this image
      let newCropConfigs = { ...cropConfigs };
      newCropConfigs[selectedSize.size][selectedSize.index] = {
        aspect: sizeToAspect(selectedSize.size),
      };
      setCropConfigs(newCropConfigs);

      // Reset the texture that may have already been saved
      let newTextureImages = { ...textureImages };
      newTextureImages[selectedSize.size][selectedSize.index] = null;
      setTextureImages(newTextureImages);

      ReactGA.event({
        category: 'Image',
        action: 'Upload Success',
        label: `${selectedSize.size}`,
      });
    };

    reader.onerror = (error) => {
      console.error('Error with image upload:', error);
      ReactGA.event({
        category: 'Image',
        action: 'Upload Error',
        label: error,
      });
    };

    reader.readAsDataURL(file);
  };

  const isCropping = () =>
    selectedSize && uploadedImages[selectedSize.size][selectedSize.index];

  /*
   *  Callback for when an ImageSize is clicked, and the menu should
   *  be expanded.
   */
  const onImageSizeClick = (size) => {
    if (size === openedMenu) setOpenedMenu(null);
    else setOpenedMenu(size);
  };

  /*
   *  Callback for when an specific image inside ImageSize is clicked.
   */
  const onImageSelect = (size, index) => {
    let doSetSize = () =>
      setSelectedSize({
        size,
        index,
      });

    if (!selectedSize) {
      doSetSize();
      return;
    }

    let currentCrop = cropConfigs[selectedSize.size][selectedSize.index];
    if (!currentCrop) {
      doSetSize();
      return;
    }

    if (currentCrop.width === 0 && currentCrop.height === 0) {
      setWarning({
        title: 'Warning: you have not set a crop',
        message:
          'To make a painting from this image you must crop it. Continue anyway?',
        onReject: () => setWarning(null),
        onAccept: () => {
          doSetSize();
          setWarning(null);
        },
      });
    } else {
      doSetSize();
    }
  };

  const createZip = async () => {
    const packName = packMeta.name || DEFAULT_PACK_META.name;
    const packDesc =
      (packMeta.description ? packMeta.description + ' | ' : '') +
      DEFAULT_PACK_META.description;
    const packFormat = packMeta.packFormat || DEFAULT_PACK_META.packFormat;
    const packResolution = packMeta.resolution || DEFAULT_PACK_META.resolution;
    const fileBuilder = packMeta.fileBuilder || DEFAULT_PACK_META.fileBuilder;
    const extension = packMeta.extension || DEFAULT_PACK_META.extension;
    const versionTag = packMeta.versionTag || DEFAULT_PACK_META.versionTag;

    const zipper = new JSZip();
    let root = zipper;
    const userPaintingsCount = await fileBuilder(root, textureImages, {
      format: packFormat,
      desc: packDesc,
      name: packName,
      resolution: packResolution,
    });

    let zipBlob = await zipper.generateAsync({
      type: 'blob',
    });

    saveAs(zipBlob, `${packName}.${extension}`);

    setShowDownloadView(false);
    setShowSupportView(true);
    ReactGA.event({
      category: 'Pack',
      action: 'Download',
      label: `v${versionTag}`,
      value: userPaintingsCount,
    });
  };

  const onDownloadPressed = () => {
    setPackMeta({});

    // Perform check
    let hasImage = false;
    for (let size in textureImages) {
      for (let image of textureImages[size]) {
        if (image) {
          hasImage = true;
          break;
        }
      }
      if (hasImage) break;
    }

    if (!hasImage) {
      setWarning({
        title: 'No images in resource pack',
        message:
          "You haven't added any images to this resource pack. Are you sure you want to continue?",
        onAccept: () => {
          setWarning(null);
          setShowDownloadView(true);
        },
        onReject: () => setWarning(null),
      });
      return;
    }

    setShowDownloadView(true);
  };

  const handleInput = (event, type) => {
    const targetVal = event.target ? event.target.value : null;
    const eventVal = event.value;
    setPackMeta((oldPackMeta) => {
      let newPackMeta = { ...oldPackMeta };
      switch (type) {
        case 'name':
          newPackMeta.name = targetVal;
          break;
        case 'description':
          newPackMeta.description = targetVal;
          break;
        case 'version':
          let showResolution = false;
          switch (eventVal) {
            case '1_14':
              newPackMeta.packFormat = 4;
              break;
            case '1_15':
              newPackMeta.packFormat = 5;
              break;
            case '1_16':
              newPackMeta.packFormat = 6;
              break;
            case 'BR_1_14':
              newPackMeta.packFormat = [1, 14, 0];
              break;
            default:
              console.error('Invalid pack version');
              break;
          }

          switch (eventVal) {
            case '1_14':
            case '1_15':
            case '1_16':
              newPackMeta.fileBuilder = fileBuilders.java;
              newPackMeta.extension = 'zip';
              break;
            case 'BR_1_14':
              newPackMeta.fileBuilder = fileBuilders.bedrock;
              newPackMeta.extension = 'mcpack';
              showResolution = true;
              break;
            default:
              break;
          }

          newPackMeta.versionTag = eventVal;
          setShowResolutionSelect(showResolution);
          break;
        case 'resolution':
          newPackMeta.resolution = eventVal;
          break;
        default:
          console.error('Invalid handleInput type: ', type);
          break;
      }
      return newPackMeta;
    });
  };

  return (
    <Layout>
      {warning && (
        <Warning onAccept={warning.onAccept} onReject={warning.onReject}>
          <h1>{warning.title}</h1>
          <p>{warning.message}</p>
        </Warning>
      )}
      {showDownloadView && (
        <DownloadView
          handleInput={handleInput}
          onDownload={createZip}
          onClose={() => setShowDownloadView(false)}
          enableResolution={showResolutionSelect}
        />
      )}
      {showSupportView && (
        <FinishView
          onClose={() => {
            setShowSupportView(false);
            ReactGA.event({
              category: 'Pack',
              action: 'Close Finish View',
            });
          }}
        />
      )}
      <Column>
        <div className="buttonsContainer">
          <UploadInput
            onUpload={onImageUpload}
            text={
              selectedSize &&
              uploadedImages[selectedSize.size][selectedSize.index]
                ? 'Change image'
                : 'Add an image'
            }
            disabled={!selectedSize}
          />
          <Button onClick={onDownloadPressed}>Download pack</Button>
        </div>
        {!selectedSize && window.innerWidth < 600 && (
          <div className="chooseSize">Choose a size to begin:</div>
        )}
        <div className="imageSizeContainer">
          {Object.keys(SIZES).map((size) => (
            <ImageSize
              size={size}
              isExpanded={size === openedMenu}
              onClick={onImageSizeClick}
              images={textureImages[size]}
              onImageSelect={onImageSelect}
              hasSelected={
                selectedSize && selectedSize.size === size && selectedSize.index
              }
              key={size}
            />
          ))}
        </div>
      </Column>
      <Column>
        {isCropping() ? (
          <Cropper
            image={uploadedImages[selectedSize.size][selectedSize.index]}
            initialCrop={
              cropConfigs[selectedSize.size][selectedSize.index] || {}
            }
            onCropChange={onCropChange}
            onCropComplete={onCropComplete}
          />
        ) : (
          <ImagePlaceHolder needsImage={!!selectedSize} />
        )}
        {selectedSize && (
          <h2>
            {uploadedImages[selectedSize.size][selectedSize.index] &&
              'Crop your image | '}
            Current size: {selectedSize.size}
          </h2>
        )}
      </Column>
      <style jsx>{`
        .imageSizeContainer {
          margin-top: 1rem;
          display: flex;
          flex-wrap: wrap;
          justify-content: space-evenly;
        }

        .buttonsContainer {
          display: flex;
          justify-content: space-evenly;
          flex-wrap: wrap;
        }

        .chooseSize {
          text-align: center;
          width: 100%;
          margin: 1rem 0;
        }

        :global(.imageSizeContainer > *) {
          margin-bottom: 1rem;
        }
      `}</style>
    </Layout>
  );
};

export default Home;
