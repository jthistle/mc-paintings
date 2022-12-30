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

/* eslint jsx-a11y/img-redundant-alt: 0 */

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
import CapturedLink from '../../components/CapturedLink';

import ReactGA from '../../analytics';
import fileBuilders from './fileBuilders';

import { SIZES, VERSION_MAP } from './configs';
import { AFFILIATE_LINK } from '../../supportLinks.json';
import DEFAULT_PACK_META from './defaultMeta';
import { Link, navigate } from '@reach/router';

import mediaQuery from '../../components/media';
import { useMedia } from 'react-media';

import AddImage from './icons/add_image.svg';
import ChangeImage from './icons/change_image.svg';
import CropIcon from './icons/crop.svg';
import DownloadIcon from './icons/download.svg';
import AffiliateImage from '../../misc/affiliate-logo.webp';

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
  const [processingDownload, setProcessingDownload] = useState(false);

  // Mobile-specific state
  const [currentSizeMob, setCurrentSizeMob] = useState('1x1');
  const [lastImageIdsMob, setLastImageIdsMob] = useState(() => {
    let init = {};
    Object.keys(SIZES).forEach((size) => {
      init[size] = 0;
    });
    return init;
  });
  const [cropOpenMob, setCropOpenMob] = useState(false);

  const media = useMedia(mediaQuery);

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

          switch (versionInfo.class) {
            case 1:
              newPackMeta.fileBuilder = fileBuilders.java;
              newPackMeta.extension = 'zip';
              break;
            case 2:
              newPackMeta.fileBuilder = fileBuilders.bedrock;
              newPackMeta.extension = 'mcpack';
              showResolution = true;
              break;
            case 3:
              newPackMeta.fileBuilder = fileBuilders.java_old;
              newPackMeta.extension = 'zip';
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
    let size = Object.keys(SIZES)[i];
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

  /// Rendering and stuff
  const renderMobile = () => {
    const disableCrop = !uploadedImages[currentSizeMob][
      lastImageIdsMob[currentSizeMob]
    ];
    return (
      <>
        <div className="spacer"></div>
        <Carousel height="5vh" onChange={mobileOnSizeChange}>
          {Object.keys(SIZES).map((size) => {
            return (
              <div className="sizeText" key={size}>
                {size}
              </div>
            );
          })}
        </Carousel>
        <div className="spacer"></div>
        {Object.keys(SIZES).map((size) => (
          <div key={size} className={size === currentSizeMob ? 'show' : 'hide'}>
            <Carousel
              height="30vh"
              onChange={(i) => mobileOnImageChange(size, i)}
            >
              {new Array(SIZES[size]).fill(0).map((_, i) => {
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
        <div className="partnerContainer">
          <div className="disclaimer">
            <CapturedLink
              to="/partnership"
              capture={navCapture}
              style={{ textDecoration: 'none' }}
            >
              <span className="disclaimerText">sponsored</span>
            </CapturedLink>
          </div>
          <a
            href={AFFILIATE_LINK}
            target="_blank"
            onClick={(e) =>
              ReactGA.event({
                category: 'Affiliate',
                action: 'Click',
                label: 'home_mobile',
              })
            }
          >
            <div className="partnerLink">
              <div className="content">
                <div>
                  <div className="logoContainer">
                    <img
                      src={AffiliateImage}
                      className="logo"
                      alt="Affiliate logo"
                    />
                  </div>
                </div>
                <div>
                  <p>Your own Minecraft server, from $0.02/hour.</p>
                  <p className="bolded">Try for free today.</p>
                </div>
              </div>
            </div>
          </a>
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

          /* partnership stuff */
          .partnerContainer {
            display: inline-block;
            width: 100%;
            margin: 1rem 0;
          }

          .partnerLink {
            width: 100%;
            display: inline-block;
            border-radius: 0.25rem;
            color: white;
            text-decoration: none;
            background-color: rgba(255, 255, 255, 0.05);
            transition: background-color 0.3s;
          }

          .partnerLink .content {
            margin: 1rem;
            display: flex;
            flex-direction: column;
            align-items: center;
          }

          .partnerLink .content > div {
            margin: 0 1rem;
          }

          .partnerLink:hover,
          .partnerLink:active {
            background-color: rgba(255, 255, 255, 0.15);
          }

          .headline {
            font-size: 1.2rem;
            font-weight: bold;
          }

          .bolded {
            font-weight: bold;
          }

          .logo {
            width: 100%;
            max-width: 16rem;
          }

          .disclaimer {
            width: 100%;
            text-align: left;
            margin-bottom: 0.2rem;
          }

          .disclaimerText {
            font-size: 0.8rem;
            color: #888;
            font-style: italic;
          }
        `}</style>
      </>
    );
  };

  // Render for desktop users
  const renderNormal = () => {
    return (
      <>
        <Column>
          <div className="buttonsContainer">
            <UploadInput onUpload={onImageUpload} disabled={!selectedSize}>
              {selectedSize &&
              uploadedImages[selectedSize.size][selectedSize.index]
                ? 'Change image'
                : 'Add an image'}
            </UploadInput>
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
                  selectedSize &&
                  selectedSize.size === size &&
                  selectedSize.index
                }
                key={size}
              />
            ))}
          </div>
          <div className="partnerContainer">
            <div className="disclaimer">
              <CapturedLink
                to="/partnership"
                capture={navCapture}
                style={{ textDecoration: 'none' }}
              >
                <span className="disclaimerText">sponsored</span>
              </CapturedLink>
            </div>
            <a
              href={AFFILIATE_LINK}
              target="_blank"
              onClick={(e) =>
                ReactGA.event({
                  category: 'Affiliate',
                  action: 'Click',
                  label: 'home_desktop',
                })
              }
            >
              <div className="partnerLink">
                <div className="content">
                  <div>
                    <div className="logoContainer">
                      <img
                        src={AffiliateImage}
                        className="logo"
                        alt="Affiliate logo"
                      />
                    </div>
                  </div>
                  <div>
                    <p className="headline">
                      Your game server. Top performance. No monthly costs.
                    </p>
                    <p>Your own Minecraft server, from $0.02/hour.</p>
                    <p className="bolded">Try for free today.</p>
                  </div>
                </div>
              </div>
            </a>
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

          /* partnership stuff */
          .partnerContainer {
            display: inline-block;
            width: 80%;
            margin-top: 4rem;
          }

          .partnerLink {
            width: 100%;
            display: inline-block;
            border-radius: 0.25rem;
            color: white;
            text-decoration: none;
            background-color: rgba(255, 255, 255, 0.05);
            transition: background-color 0.3s;
          }

          .partnerLink .content {
            margin: 0.5rem;
            display: flex;
            flex-direction: row;
            align-items: center;
          }

          .partnerLink .content > div {
            margin: 0 1rem;
          }

          .partnerLink:hover,
          .partnerLink:active {
            background-color: rgba(255, 255, 255, 0.15);
          }

          .headline {
            font-size: 1.2rem;
            font-weight: bold;
          }

          .bolded {
            font-weight: bold;
          }

          .logo {
            width: 100%;
            max-width: 20rem;
          }

          .disclaimer {
            width: 100%;
            text-align: left;
            margin-bottom: 0.2rem;
          }

          .disclaimerText {
            font-size: 0.8rem;
            color: #888;
            font-style: italic;
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
