import React, { useState, useEffect } from 'react';
import Layout, { Column } from '../../components/Layout';
import { c_INACTIVE } from '../../theme';
import UploadInput from '../../components/UploadInput';
import Cropper from '../../components/Cropper';
import ImageSize from '../../components/ImageSize';

const DEBUG = process.env.NODE_ENV === 'development';

const ImagePlaceHolder = () => (
  <div className="placeholder">
    Upload an image to start
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

const SIZES = {
  '1x1': 7,
  '1x2': 2,
  '2x1': 5,
  '2x2': 6,
  '4x2': 1,
  '4x3': 2,
  '4x4': 3,
};

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
  Object.keys(SIZES).map(size => {
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

  const onCropChange = event => {
    if (!selectedSize) return;

    let newConfigs = { ...cropConfigs };
    newConfigs[selectedSize.size][selectedSize.index] = event.crop;
    setCropConfigs(newConfigs);

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

    console.log('uploaded');

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
      console.log(
        'new config: ',
        newCropConfigs[selectedSize.size][selectedSize.index]
      );
      setCropConfigs(newCropConfigs);

      // Reset the texture that may have already been saved
      let newTextureImages = { ...textureImages };
      newTextureImages[selectedSize.size][selectedSize.index] = null;
      setTextureImages(newTextureImages);
      console.log('done');
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
    setSelectedSize({
      size,
      index,
    });
    setOpenedMenu(null);
  };

  useEffect(() => {
    if (!DEBUG) return;

    console.log('Current size: ', selectedSize);
    console.log('Uploaded images:', uploadedImages);
    console.log('Crop configs:', cropConfigs);
    console.log('Texture images:', textureImages);
  });

  return (
    <Layout>
      <Column>
        <UploadInput onUpload={onImageUpload} />
        {// debug:
        selectedSize && (
          <img
            src={textureImages[selectedSize.size][selectedSize.index] || ''}
          />
        )}
        <div className="imageSizeContainer">
          {Object.keys(SIZES).map(size => (
            <ImageSize
              size={size}
              isExpanded={size === openedMenu}
              onClick={onImageSizeClick}
              images={textureImages[size]}
              onImageSelect={onImageSelect}
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
          />
        ) : (
          <ImagePlaceHolder />
        )}
      </Column>
      <style jsx>{`
        .imageSizeContainer {
          margin-top: 1rem;
          display: flex;
          flex-wrap: wrap;
          justify-content: space-evenly;
        }

        :global(.imageSizeContainer > *) {
          margin-bottom: 1rem;
        }
      `}</style>
    </Layout>
  );
};

export default Home;
