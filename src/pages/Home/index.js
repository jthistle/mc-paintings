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
import SupportView from '../../components/SupportView';

import { SIZES, MC_1_14_NAMES, DEFAULT_PACK_META } from './configs';

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
  const [width, height] = size.split('x').map(val => parseInt(val));
  return width / height;
}

/*
 *  Generate an initial object for any of the configuration maps.
 */
function generateInitial() {
  let initial = {};
  Object.keys(SIZES).forEach(size => {
    initial[size] = Array(SIZES[size]).fill(undefined);
  });
  return initial;
}

const Home = () => {
  // current image to use { size: string, index: int }, falsly if none selected
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
   *  The pack meta data. Should be formatted as:
   *    {
   *      name: string,
   *      description: string,
   *    }
   */
  const [packMeta, setPackMeta] = useState({});

  const [showDownloadView, setShowDownloadView] = useState(false);
  const [showSupportView, setShowSupportView] = useState(false);

  const onCropChange = event => {
    if (!selectedSize) return;

    let newConfigs = { ...cropConfigs };
    newConfigs[selectedSize.size][selectedSize.index] = event.crop;
    setCropConfigs(newConfigs);
  };

  const onCropComplete = event => {
    if (!selectedSize) return;

    let newTextureImages = { ...textureImages };
    newTextureImages[selectedSize.size][selectedSize.index] =
      event.croppedImage;
    setTextureImages(newTextureImages);
  };

  /*
   *  Callback for when the upload of an image has finished.
   */
  const onImageUpload = event => {
    if (!selectedSize) return;

    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = event => {
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
    };

    reader.onerror = error => {
      console.error('Error with image upload:', error);
    };

    reader.readAsDataURL(file);
  };

  const isCropping = () =>
    selectedSize && uploadedImages[selectedSize.size][selectedSize.index];

  /*
   *  Callback for when an ImageSize is clicked, and the menu should
   *  be expanded.
   */
  const onImageSizeClick = size => {
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

  const createNewImage = imageString => {
    return new Promise((resolve, reject) => {
      let imageObj = new Image();
      imageObj.src = imageString;
      imageObj.onload = () => {
        resolve(imageObj);
      };
    });
  };

  const createZip = async () => {
    let packName = packMeta.name || DEFAULT_PACK_META.name;
    let packDesc =
      (packMeta.description ? packMeta.description + ' | ' : '') +
      DEFAULT_PACK_META.description;

    const zipper = new JSZip();
    let root = zipper;
    root.file(
      'pack.mcmeta',
      JSON.stringify({
        pack: {
          pack_format: 4,
          description: packDesc,
        },
      })
    );
    let paintings = root.folder('assets/minecraft/textures/painting');

    for (let size in textureImages) {
      let thisSize = textureImages[size];
      for (let i = 0; i < thisSize.length; i++) {
        // At this point the image is in jpeg format so convert
        // it to a png via a canvas
        let jpegImage = thisSize[i];
        if (!jpegImage) continue;

        let imageObj = await createNewImage(jpegImage);

        let canvas = document.createElement('canvas');
        canvas.width = imageObj.naturalWidth;
        canvas.height = imageObj.naturalHeight;
        let context = canvas.getContext('2d');
        context.drawImage(imageObj, 0, 0);

        let imageString = canvas
          .toDataURL()
          .replace('data:image/png;base64,', '');
        paintings.file(`${MC_1_14_NAMES[size][i]}.png`, imageString, {
          base64: true,
        });
      }
    }

    let zipBlob = await zipper.generateAsync({
      type: 'blob',
    });

    saveAs(zipBlob, `${packName}.zip`);

    setShowDownloadView(false);
    setShowSupportView(true);
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
    let newPackMeta = { ...packMeta };
    switch (type) {
      case 'name':
        newPackMeta.name = event.target.value;
        break;
      case 'description':
        newPackMeta.description = event.target.value;
        break;
      default:
        console.error('Invalid handleInput type: ', type);
    }

    setPackMeta(newPackMeta);
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
        />
      )}
      {showSupportView && (
        <SupportView onClose={() => setShowSupportView(false)} />
      )}
      <Column>
        <div className="buttonsContainer">
          <UploadInput
            onUpload={onImageUpload}
            text={
              selectedSize &&
              uploadedImages[selectedSize.size][selectedSize.index]
                ? 'Change image'
                : 'Upload an image'
            }
            disabled={!selectedSize}
          />
          <Button onClick={onDownloadPressed}>Download pack</Button>
        </div>
        {!selectedSize && window.innerWidth < 600 && (
          <div className="chooseSize">Choose a size to begin:</div>
        )}
        <div className="imageSizeContainer">
          {Object.keys(SIZES).map(size => (
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
