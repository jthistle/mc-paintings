import React, { useState } from 'react';
import Layout, { Column } from '../../components/Layout';
import { c_INACTIVE } from '../../theme';
import UploadInput from '../../components/UploadInput';
import Cropper from '../../components/Cropper';
import ImageSize from '../../components/ImageSize';

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

const Home = () => {
  const [images, setImages] = useState([]); // list of uploaded images
  const [currentImage, setCurrentImage] = useState(0); // index of images, deprecate?
  const [croppedImage, setCroppedImage] = useState(); // current cropped image
  const [currentSize, setCurrentSize] = useState(); // current size string to use
  const [openedMenu, setOpenedMenu] = useState();

  const initialTextures = {};
  Object.keys(SIZES).forEach(size => {
    initialTextures[size] = Array(SIZES[size]);
  });

  const [textureImages, setTextureImages] = useState(initialTextures);

  const onCropChange = event => {
    setCroppedImage(event.croppedImage);
  };

  const onImageUpload = event => {
    const file = event.target.files[0];
    console.log(file);

    const reader = new FileReader();

    reader.onload = event => {
      var imageData = event.target.result;
      setImages(images.concat([imageData]));
    };

    reader.readAsDataURL(file);
  };

  const isCropping = () => currentImage < images.length;

  const onImageSizeClick = size => {
    if (size === openedMenu) setOpenedMenu(null);
    else setOpenedMenu(size);
  };

  return (
    <Layout>
      <Column>
        <h1>Some testing text goes right here, but it's a bit big</h1>
        <UploadInput callback={onImageUpload} />
        {croppedImage && <img src={croppedImage} alt="cropped image" />}
        <div className="imageSizeContainer">
          {Object.keys(SIZES).map(size => (
            <ImageSize
              size={size}
              isExpanded={size === openedMenu}
              onClick={onImageSizeClick}
              images={textureImages[size]}
            />
          ))}
        </div>
      </Column>
      <Column>
        {isCropping() ? (
          <Cropper
            image={images[currentImage]}
            aspectRatio={1 /* TEMP DEBUG */}
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
