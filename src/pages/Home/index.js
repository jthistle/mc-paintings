/*
 *  Copyright (C) 2022 James Thistlewood
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

// misguided warning about the word 'image' appearing in alt text
/* eslint-disable jsx-a11y/img-redundant-alt */

import React, { useEffect, useState } from 'react';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

import Layout, { Column } from '../../components/Layout';
import { c_INACTIVE } from '../../theme';
import UploadInput from '../../components/UploadInput';
import Cropper from '../../components/Cropper';
import ImageSize from '../../components/ImageSize';
import ImageSelectMobile from '../../components/ImageSelectMobile';
import Warning from '../../components/Warning';
import Button from '../../components/Button';
import DownloadView from '../../components/DownloadView';
import FinishView from '../../components/FinishView';
import Carousel from '../../components/Carousel';

import ReactGA from '../../analytics';
import fileBuilders from './fileBuilders';

import { SIZES_1_14, SIZES_1_21, VERSION_MAP } from './configs';
import DEFAULT_PACK_META from './defaultMeta';
import { navigate } from '@reach/router';

import mediaQuery from '../../components/media';
import { useMedia } from 'react-media';

import AddImage from './icons/add_image.svg';
import ChangeImage from './icons/change_image.svg';
import CropIcon from './icons/crop.svg';
import DownloadIcon from './icons/download.svg';
import BinIcon from './icons/bin.svg';
import { FEEDBACK } from '../../supportLinks.json';

const ImagePlaceHolder = ({ needsImage }) => (
  <div className="placeholder">
    {/* {needsImage ? 'Upload an image' : 'Choose a size to begin'} */}
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
function generateInitial(sizes) {
  let initial = {};
  Object.keys(sizes).forEach((size) => {
    initial[size] = Array(sizes[size]).fill(undefined);
  });
  return initial;
}

const Home = () => {
  // current image to use { size: string, index: int }, falsy if none selected
  const [selectedSize, setSelectedSize] = useState();
  // the current opened menu (size string), falsy if none open
  const [openedMenu, setOpenedMenu] = useState();

  // new version of mc or not
  const [usingVersion, setUsingVersion] = useState(null);
  const [sizesList, setSizesList] = useState(SIZES_1_21);

  /*
   *  These all hold info about the current set of images being manipulated.
   *    textureImages: the cropped images that will be used as painting textures
   *    uploadedImages: the uncropped uploaded images that can be manipulated
   *    cropConfigs: the initial crop settings to be used when returning to images
   */
  const [textureImages, setTextureImages] = useState(
    generateInitial(SIZES_1_21)
  );
  const [uploadedImages, setUploadedImages] = useState(
    generateInitial(SIZES_1_21)
  );
  const [cropConfigs, setCropConfigs] = useState(generateInitial(SIZES_1_21));

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
  const [processingDownload, setProcessingDownload] = useState(false);

  // Mobile-specific state
  const [currentSizeMob, setCurrentSizeMob] = useState('1x1');
  const [lastImageIdsMob, setLastImageIdsMob] = useState(() => {
    let init = {};
    Object.keys(SIZES_1_21).forEach((size) => {
      init[size] = 0;
    });
    return init;
  });
  const [cropOpenMob, setCropOpenMob] = useState(false);

  const media = useMedia(mediaQuery);

  // once version selected
  useEffect(() => {
    let sizes;
    if (usingVersion === null) {
      sizes = SIZES_1_21;
    } else {
      sizes = usingVersion === '1_21' ? SIZES_1_21 : SIZES_1_14;
    }

    setSizesList(sizes);

    setTextureImages(generateInitial(sizes));
    setUploadedImages(generateInitial(sizes));
    setCropConfigs(generateInitial(sizes));

    setLastImageIdsMob(() => {
      let init = {};
      Object.keys(sizes).forEach((size) => {
        init[size] = 0;
      });
      return init;
    });
  }, [usingVersion]);

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
      const aspect = sizeToAspect(selectedSize.size);
      newCropConfigs[selectedSize.size][selectedSize.index] = {
        unit: '%',
        x: 20,
        y: 20,
        width: 60,
        height: 60 / aspect,
        aspect,
      };
      setCropConfigs(newCropConfigs);

      // Reset the texture that may have already been saved
      let newTextureImages = { ...textureImages };
      newTextureImages[selectedSize.size][selectedSize.index] = null;
      setTextureImages(newTextureImages);

      setCropOpenMob(true);

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

  const clearCurrentImage = () => {
    // Clear uploaded image
    let newUploadedImages = { ...uploadedImages };
    newUploadedImages[selectedSize.size][selectedSize.index] = null;
    setUploadedImages(newUploadedImages);

    // Ignore resetting crop config, this will be reset if a new image is uploaded

    // Reset any saved texures
    let newTextureImages = { ...textureImages };
    newTextureImages[selectedSize.size][selectedSize.index] = null;
    setTextureImages(newTextureImages);
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
    setProcessingDownload(true);

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
    setProcessingDownload(false);
    setShowSupportView(true);
    ReactGA.event({
      category: 'Pack',
      action: 'Download',
      label: `v${versionTag}`,
      value: userPaintingsCount,
    });
  };

  const hasImage = () => {
    for (let size in textureImages) {
      for (let image of textureImages[size]) {
        if (image) {
          return true;
        }
      }
    }
    return false;
  };

  const navCapture = (to, e) => {
    if (hasImage()) {
      e.preventDefault();
      e.stopPropagation();
      setWarning({
        title: 'Unsaved work',
        message:
          'Navigating away from this page will cause your work to be lost. Are you sure you want to continue?',
        onAccept: () => {
          navigate(to);
        },
        onReject: () => {
          setWarning(null);
        },
      });
    }
  };

  const unloadEventListener = (e) => {
    if (hasImage()) {
      e.preventDefault();
      return 'aaa'; // legacy
    }
  };

  // warning for closing tab with unsaved work
  useEffect(() => {
    window.onbeforeunload = unloadEventListener;
  }, [textureImages]);

  const onDownloadPressed = () => {
    setPackMeta({});

    if (!hasImage()) {
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
          const versionInfo = VERSION_MAP[eventVal];

          if (versionInfo === undefined) {
            console.error('Unexpected pack version!');
            break;
          }

          newPackMeta.packFormat = versionInfo.packFormat;

          // for explanation of .class, see configs.js
          switch (versionInfo.class) {
            case 1:
              newPackMeta.fileBuilder = fileBuilders.java_1_14;
              newPackMeta.extension = 'zip';
              break;
            case 2:
              newPackMeta.fileBuilder = fileBuilders.bedrock_1_14;
              newPackMeta.extension = 'mcpack';
              showResolution = true;
              break;
            case 3:
              newPackMeta.fileBuilder = fileBuilders.java_old;
              newPackMeta.extension = 'zip';
              showResolution = true;
              break;
            case 4:
              newPackMeta.fileBuilder = fileBuilders.java_1_21;
              newPackMeta.extension = 'zip';
              break;
            case 5:
              newPackMeta.fileBuilder = fileBuilders.bedrock_1_21;
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

  const mobileOnSizeChange = (i) => {
    let size = Object.keys(sizesList)[i];
    setCurrentSizeMob(size);
    onImageSelect(size, lastImageIdsMob[size]);
  };

  const mobileOnImageChange = (size, i) => {
    setLastImageIdsMob((old) => {
      old[size] = i;
      return old;
    });
    onImageSelect(size, i);
  };

  useEffect(() => {
    if (!media.mobile) return;
    mobileOnSizeChange(0);
    // god i hate these stupid dependency warnings
    // no, eslint, my effect doesn't depend on a function it calls,
    // even if it technically does
    // i know u don't have any better way of knowing but anyway
    // eslint-disable-next-line
  }, [media.mobile]);

  const renderVersionChoice = () => {
    return (
      <div className="container">
        <div>I'm using...</div>
        <div className="space" />
        <Button scheme="green" onClick={() => setUsingVersion('1_21')}>
          1.21+ (Tricky Trials)
        </Button>
        <div className="space" />
        <Button onClick={() => setUsingVersion('old')}>An older version</Button>
        <style jsx>{`
          .container {
            padding: 2rem 0;
            text-align: center;
            display: flex;
            flex-direction: column;
          }

          .container div {
            font-size: 1.1rem;
            font-weight: bold;
          }

          .space {
            height: 2rem;
          }
        `}</style>
      </div>
    );
  };

  /// Rendering and stuff
  const renderMobile = () => {
    if (usingVersion === null) {
      return renderVersionChoice();
    }

    const disableCrop =
      !uploadedImages[currentSizeMob][lastImageIdsMob[currentSizeMob]];

    return (
      <>
        <div className="spacer"></div>
        <Carousel height="5vh" onChange={mobileOnSizeChange}>
          {Object.keys(sizesList).map((size) => {
            return (
              <div className="sizeText" key={size}>
                {size}
              </div>
            );
          })}
        </Carousel>
        <div className="spacer"></div>
        {Object.keys(sizesList).map((size) => (
          <div key={size} className={size === currentSizeMob ? 'show' : 'hide'}>
            <Carousel
              height="30vh"
              onChange={(i) => mobileOnImageChange(size, i)}
            >
              {new Array(sizesList[size]).fill(0).map((_, i) => {
                return (
                  <ImageSelectMobile
                    image={textureImages[size][i]}
                    size={size}
                    index={i}
                    key={i}
                  />
                );
              })}
            </Carousel>
          </div>
        ))}
        <div className="buttons">
          {!disableCrop && (
            <Button onClick={clearCurrentImage} scheme="red">
              <div className="iconContainer">
                <img
                  className="buttonIcon"
                  src={BinIcon}
                  alt="Clear image"
                ></img>
              </div>
            </Button>
          )}
          <UploadInput width={5} onUpload={onImageUpload}>
            <div className="iconContainer">
              <img
                className="buttonIcon"
                src={disableCrop ? AddImage : ChangeImage}
                alt="Upload image"
              ></img>
            </div>
          </UploadInput>
          <Button
            disabled={disableCrop}
            onClick={() => !disableCrop && setCropOpenMob(true)}
          >
            <div className="iconContainer">
              <img className="buttonIcon" src={CropIcon} alt="Crop image"></img>
            </div>
          </Button>
          <Button onClick={onDownloadPressed}>
            <div className="iconContainer">
              <img
                className="buttonIcon"
                src={DownloadIcon}
                alt="Download resource pack"
              ></img>
            </div>
          </Button>
        </div>
        {cropOpenMob && (
          <>
            <div
              className="blackout"
              onClick={() => setCropOpenMob(false)}
            ></div>
            <div className="cropper">
              <Cropper
                image={uploadedImages[selectedSize.size][selectedSize.index]}
                initialCrop={
                  cropConfigs[selectedSize.size][selectedSize.index] || {}
                }
                onCropChange={onCropChange}
                onCropComplete={onCropComplete}
              />
              <div className="cropText">Drag to crop</div>
            </div>
          </>
        )}
        <style jsx>{`
          .spacer {
            height: 2rem;
          }

          .sizeText {
            letter-spacing: 0.5rem;
            font-weight: bold;
            line-height: 5vh;
          }

          .hide {
            display: none;
          }

          .iconContainer {
            height: 100%;
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .buttonIcon {
            height: 1.5rem;
            display: inline-block;
          }

          .cropper {
            position: absolute;
            top: 10vh;
            left: 10vw;
            width: 80vw;
            z-index: 4;
            text-align: center;
          }

          .blackout {
            z-index: 3;
            position: fixed;
            top: 0;
            left: 0;
            height: 100vh;
            width: 100vw;
            background-color: black;
            opacity: 0.7;
          }

          .cropText {
            font-weight: bold;
            margin: 2rem 0;
            text-align: center;
            display: inline-block;
          }

          .buttons {
            margin: 1rem 0 2rem 0;
          }
        `}</style>
      </>
    );
  };

  // Render for desktop users
  const renderNormal = () => {
    const renderSizeSelect = () => {
      const imageExists =
        selectedSize && uploadedImages[selectedSize.size][selectedSize.index];
      return (
        <>
          <div className="buttonsContainer">
            <UploadInput onUpload={onImageUpload} disabled={!selectedSize}>
              {imageExists ? 'Change image' : 'Add an image'}
            </UploadInput>
            {imageExists && (
              <Button scheme="red" onClick={clearCurrentImage}>
                <img
                  className="buttonIcon"
                  src={BinIcon}
                  alt="Clear image"
                ></img>
              </Button>
            )}
            <div className="hspace"></div>
            <Button onClick={onDownloadPressed}>Download pack</Button>
          </div>
          {!selectedSize && window.innerWidth < 600 && (
            <div className="chooseSize">Choose a size to begin:</div>
          )}
          <div className="imageSizeContainer">
            {Object.keys(sizesList).map((size) => (
              <ImageSize
                size={size}
                isExpanded={size === openedMenu}
                onClick={onImageSizeClick}
                images={textureImages[size]}
                onImageSelect={onImageSelect}
                hasSelected={
                  selectedSize &&
                  selectedSize.size === size &&
                  selectedSize.index
                }
                key={size}
              />
            ))}
          </div>
          <style jsx>{`
            .imageSizeContainer {
              margin-top: 2rem;
              display: flex;
              flex-wrap: wrap;
              justify-content: space-evenly;
            }

            .buttonsContainer {
              display: flex;
              justify-content: space-evenly;
              flex-wrap: wrap;
            }

            .buttonIcon {
              margin: 0.75rem 0;
              max-height: 1.5rem;
              display: inline-block;
            }

            .chooseSize {
              text-align: center;
              width: 100%;
              margin: 1rem 0;
            }

            .hspace {
              width: 2rem;
            }
          `}</style>
        </>
      );
    };

    return (
      <>
        <Column>
          {usingVersion === null ? renderVersionChoice() : renderSizeSelect()}
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

          <div className="message">
            <p>We have updated to support 1.21!</p>
            <p>
              Found a problem?{' '}
              <a href={FEEDBACK} target="_blank">
                Leave some feedback
              </a>
              .
            </p>
          </div>
        </Column>
        <style jsx>{`
          .message {
            width: 100%;
            text-align: center;
            margin: 2rem 0;
          }

          .space {
            height: 2rem;
          }

          :global(.imageSizeContainer > *) {
            margin-bottom: 1rem;
          }
        `}</style>
      </>
    );
  };

  return (
    <Layout captureHeader={navCapture}>
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
          processing={processingDownload}
          usingVersion={usingVersion}
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
      {media.mobile ? renderMobile() : renderNormal()}
    </Layout>
  );
};

export default Home;
