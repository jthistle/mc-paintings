import React, { useState } from 'react';
import Layout, { Column } from '../../components/Layout';
import { c_INACTIVE } from '../../theme';
import UploadInput from '../../components/UploadInput';
import Cropper from '../../components/Cropper';

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

const Home = () => {
  const [images, setImages] = useState([]);
  const [currentImage, setCurrentImage] = useState(0);
  const [croppedImage, setCroppedImage] = useState();

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

  return (
    <Layout>
      <Column>
        <h1>Some testing text goes right here, but it's a bit big</h1>
        <UploadInput callback={onImageUpload} />
        {croppedImage && <img src={croppedImage} alt="cropped image" />}
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
    </Layout>
  );
};

export default Home;
