import React, { useState, useEffect } from 'react';
import Cropper from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

/*
 *  Cropper
 *
 *  Takes props:
 *    image: a base64 string
 *    aspectRatio: a number
 *    onCropChange: a callback function that will be passed the change event
 */
export default ({ image, aspectRatio, onCropChange, ...props }) => {
  const [currentImageRef, setCurrentImageRef] = useState();
  const [crop, setCrop] = useState({ aspect: aspectRatio });

  useEffect(() => {
    var tempCrop = crop;
    tempCrop.aspect = aspectRatio;
    setCrop(tempCrop);
  }, props);

  /*
  `*  This was taken from the docs for `react-image-crop`
   */
  const getCroppedImg = (image, crop) => {
    if (crop.width <= 0 || crop.height <= 0) return;

    const canvas = document.createElement('canvas');
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext('2d');

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    // Return as Base64 string
    return canvas.toDataURL('image/jpeg');
  };

  const onChange = crop => {
    setCrop(crop);
    if (onCropChange)
      onCropChange({
        crop,
        croppedImage: getCroppedImg(currentImageRef, crop),
      });
  };

  return (
    <Cropper
      src={image}
      crop={crop}
      onChange={onChange}
      onImageLoaded={setCurrentImageRef}
    />
  );
};
