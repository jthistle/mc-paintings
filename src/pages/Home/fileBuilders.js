import { MC_1_14_NAMES, SINGLE_TEX_POSITIONS } from './configs';
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
  root.file(
    'pack.mcmeta',
    JSON.stringify({
      pack: {
        pack_format: meta.format,
        description: meta.desc,
      },
    })
  );
  let paintings = root.folder('assets/minecraft/textures/painting');

  let userPaintingsCount = 0;
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
  context.drawImage(baseImage, 0, 0, fullSize, fullSize);

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
