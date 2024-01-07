/*
 *  Copyright (C) 2024 James Thistlewood
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

import {
  MC_1_14_NAMES,
  SINGLE_TEX_POSITIONS,
  MAX_PACK_FORMAT,
} from './configs';
import { v4 as uuid } from 'uuid';
import defaultBedrockImage from './template_br.png';
import defaultJavaImage from './template_java.png';

function createNewImage(imageString) {
  return new Promise((resolve, reject) => {
    let imageObj = new Image();
    imageObj.src = imageString;
    imageObj.onload = () => {
      resolve(imageObj);
    };
  });
}

/**
 * Java file builder.
 *
 * Requires meta as:
 *    {
 *      format: Number,
 *      desc: String,
 *    }
 */
async function java(root, textureImages, meta) {
  let min_format = meta.format;
  let max_format = meta.format;

  // Version 5 = 1.15, the first version to use multiple painting files.
  // (Well, actually, this was 1.14, but versioning was fucked - see configs.js.)
  // As of 1.20.4, there have been literally no changes to paintings since 1.15.
  // So, we can safely use any version in the range 1.15 - 1.20.4.
  if (meta.format >= 5) {
    min_format = 5;
    max_format = MAX_PACK_FORMAT;
  }

  root.file(
    'pack.mcmeta',
    JSON.stringify({
      pack: {
        pack_format: meta.format,
        description: meta.desc,
        // Since 1.20.2, this field is supported in the metadata. It should be
        // ignored by older versions.
        supported_formats: {
          min_inclusive: min_format,
          max_inclusive: max_format,
        },
      },
    })
  );
  let paintings = root.folder('assets/minecraft/textures/painting');

  let userPaintingsCount = 0;
  for (let size in textureImages) {
    let thisSize = textureImages[size];
    for (let i = 0; i < thisSize.length; i++) {
      // At this point the image is in jpeg format so convert
      // it to a png via a canvas.
      // SINCE 1.20.3, ONLY PNGs WORK!!!
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
      userPaintingsCount += 1;
    }
  }
  return userPaintingsCount;
}

/**
 * For Minecraft versions which use a single texture to hold all painting textures.
 *
 * This is all Bedrock versions and Java versions up to and including 1.13.x.
 */
async function generalizedSingleTexture(meta, baseImage, textureImages) {
  const canvas = document.createElement('canvas');
  const blockPixels = meta.resolution;
  const fullSize = blockPixels * 16;
  canvas.width = fullSize;
  canvas.height = fullSize;
  const context = canvas.getContext('2d');

  context.imageSmoothingEnabled = false;
  context.drawImage(baseImage, 0, 0, fullSize, fullSize);
  context.imageSmoothingEnabled = true;

  let userPaintingsCount = 0;
  for (let size in textureImages) {
    let thisSize = textureImages[size];
    let sizeAndPositions = SINGLE_TEX_POSITIONS[size];
    for (let i = 0; i < thisSize.length; i++) {
      // At this point the image is in jpeg format so convert
      // it to a png via a canvas
      let jpegImage = thisSize[i];
      if (!jpegImage) continue;

      let imageObj = await createNewImage(jpegImage);

      let positionConfig = sizeAndPositions.positions[i];
      let sizeConfig = sizeAndPositions.size;

      context.drawImage(
        imageObj,
        positionConfig.x * blockPixels,
        positionConfig.y * blockPixels,
        sizeConfig.w * blockPixels,
        sizeConfig.h * blockPixels
      );

      userPaintingsCount += 1;
    }
  }

  let imageString = canvas.toDataURL().replace('data:image/png;base64,', '');
  return [imageString, userPaintingsCount];
}

/**
 * Bedrock file builder. Requires meta:
 *    {
 *      desc: String,
 *      name: String,
 *      resolution: Number,
 *      packFormat: [Number, Number, Number]
 *    }
 */
async function bedrock(root, textureImages, meta) {
  root.file(
    'manifest.json',
    JSON.stringify({
      format_version: 2,
      header: {
        description: meta.desc,
        name: `${meta.name}`,
        uuid: uuid(),
        version: [0, 0, 1],
        min_engine_version: meta.format,
      },
      modules: [
        {
          description: meta.desc,
          type: 'resources',
          uuid: uuid(), // yes this is supposed to be different from the one above
          version: [0, 0, 1],
        },
      ],
    })
  );

  const paintingDir = root.folder('textures/painting');
  const baseImage = await createNewImage(defaultBedrockImage);
  const [imageString, userPaintingsCount] = await generalizedSingleTexture(
    meta,
    baseImage,
    textureImages
  );

  paintingDir.file('kz.png', imageString, {
    base64: true,
  });

  return userPaintingsCount;
}

/**
 * Java file builder for versions < 1.14.
 *
 * Requires meta as:
 *    {
 *      format: Number,
 *      desc: String,
 *    }
 */
async function java_old(root, textureImages, meta) {
  root.file(
    'pack.mcmeta',
    JSON.stringify({
      pack: {
        pack_format: meta.format,
        description: meta.desc,
      },
    })
  );

  const paintingDir = root.folder('assets/minecraft/textures/painting');
  const baseImage = await createNewImage(defaultJavaImage);
  const [imageString, userPaintingsCount] = await generalizedSingleTexture(
    meta,
    baseImage,
    textureImages
  );

  paintingDir.file('paintings_kristoffer_zetterstrand.png', imageString, {
    base64: true,
  });

  return userPaintingsCount;
}

export default {
  java,
  java_old,
  bedrock,
};
