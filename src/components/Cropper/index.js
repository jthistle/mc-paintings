/*
 *  Copyright (C) 2020 James Thistlewood
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

import React, { useState, useEffect } from 'react';
import Cropper from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

/*
 *  Cropper
 *
 *  Takes props:
 *    image: a base64 string
 *    initialCrop: the initial crop object
 *    onCropChange: a callback function that will be passed the change event
 */
export default ({ image, initialCrop, onCropChange, onCropComplete }) => {
  const [currentImageRef, setCurrentImageRef] = useState();
  const [crop, setCrop] = useState(initialCrop);
  const [imageToUse, setImageToUse] = useState();
  const [stale, setStale] = useState({
    image: true,
    crop: true,
  });

  useEffect(() => {
    if (image === imageToUse) return;

    // Image has changed, both crop and image are stale
    setStale({
      image: true,
      crop: true,
    });
  }, [image, imageToUse]);

  useEffect(() => {
    // Only update crop for Cropper if we need to
    if (!stale.crop) return;

    setCrop(initialCrop);
    setStale((v) => ({
      ...v,
      crop: false,
    }));
  }, [initialCrop, stale]);

  useEffect(() => {
    if (Object.keys(crop).length === 0) {
      // If the current initial crop is undecided (i.e. === {}), make
      // sure that we update the crop the next time it becomes decided.
      setStale((v) => ({
        ...v,
        crop: true,
      }));
    }

    // Only reset image if crop has been set in order to
    // make sure we load the image after setting the crop
    if (!stale.image || stale.crop) return;

    setImageToUse(image);
    setStale((v) => ({
      ...v,
      image: false,
    }));
    // We don't want to depend on image, disable warning
    // eslint-disable-next-line
  }, [crop, stale]);

  /*
   *  This was taken from the docs for `react-image-crop`
   */
  const getCroppedImg = (image, crop) => {
    if (crop.width <= 0 || crop.height <= 0 || !image) return;

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

  const onChange = (crop) => {
    setCrop(crop);
    if (onCropChange)
      onCropChange({
        crop,
      });
  };

  const onComplete = (crop) => {
    setCrop(crop);
    if (onCropComplete)
      onCropComplete({
        croppedImage: getCroppedImg(currentImageRef, crop),
      });
  };

  return (
    <Cropper
      src={imageToUse}
      crop={crop}
      onChange={onChange}
      onComplete={onComplete}
      onImageLoaded={setCurrentImageRef}
    />
  );
};
