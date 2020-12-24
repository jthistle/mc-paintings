/**
 * A module for parsing Minecraft resource packs (textures and models) and creating
 * a representation for use with three.js.
 */

import * as THREE from 'three';

// Transparent texture for missing faces
const data = new Uint8Array([0, 0, 0, 0]);
const transparent = new THREE.DataTexture(data, 1, 1, THREE.RGBAFormat);

async function loadJSON(url) {
  const res = await fetch(url);
  return await res.json();
}

// Regex for parsing strings like minecraft:block/pumpkin
const ident_re = /(?:([a-z0-9]+):)?([a-z0-9_/]+)/i;

// Recursively builds up model starting from a block identifier
async function buildUpModel(ident) {
  const parts = ident_re.exec(ident);

  if (parts[1] && parts[1] !== 'minecraft') {
    return;
  }

  const toLoad = `/textures/minecraft/models/${parts[2]}.json`;
  const model = await loadJSON(toLoad);

  if (!model.parent) {
    return model;
  }

  const parent = await buildUpModel(model.parent);

  const full_model = {
    ...parent,
    ...model,
    display: { ...(parent.display || {}), ...(model.display || {}) },
    textures: { ...(parent.textures || {}), ...(model.textures || {}) },
    elements: (parent.elements || []).concat(model.elements || []),
  };

  return full_model;
}

// Loads the textures needed for a model
async function loadTextures(model) {
  const textures = {};
  const loader = new THREE.TextureLoader();

  for (let ident in model.textures) {
    if (model.textures[ident].slice(0, 1) === '#') continue;

    const texLoc = ident_re.exec(model.textures[ident])[2];

    const textureURL = `/textures/minecraft/textures/${texLoc}.png`;
    console.log('load', textureURL);
    const texture = await loader.loadAsync(textureURL);
    texture.magFilter = THREE.NearestFilter;
    textures[ident] = texture;
  }

  // Hack, of sorts - keep trying until we resolve dependencies
  let remaining = -1;
  let last_remaining = 0;
  while (remaining !== 0 && remaining !== last_remaining) {
    last_remaining = remaining;
    remaining = 0;
    for (let ident in model.textures) {
      if (model.textures[ident].slice(0, 1) !== '#') continue;
      if (textures[ident]) continue;

      console.log(`alias ${ident} to ${model.textures[ident].slice(1)}`);
      const target = textures[model.textures[ident].slice(1)];

      if (!target) {
        remaining += 1;
        continue;
      }

      textures[ident] = target;
    }
  }

  return textures;
}

// Creates the block geometries
function createGeometries(model) {
  const geos = model.elements.map((el) => {
    const geometry = new THREE.BoxGeometry(
      el.to[0] - el.from[0],
      el.to[1] - el.from[1],
      el.to[2] - el.from[2]
    );

    return geometry;
  });

  return geos;
}

function createMaterials(model, textures) {
  const order = ['north', 'south', 'up', 'down', 'east', 'west'];

  return model.elements.map((el, i) => {
    return order.map((faceName) => {
      const face = el.faces[faceName];
      if (!face) {
        return transparent;
      }
      const ident = face.texture.slice(1);

      let color = 0xffffff;
      if (face.tintindex !== undefined) {
        color = 0x32d827;
      }

      return new THREE.MeshBasicMaterial({
        map: textures[ident],
        transparent: true,
        color,
      });
    });
  });
}

function addMeshes(model, geos, materials, scene) {
  return model.elements.map((el, i) => {
    const mesh = new THREE.Mesh(geos[i], materials[i]);
    scene.add(mesh);

    const pos = [-8, -8, -8];
    for (let i = 0; i < 3; ++i) {
      pos[i] += el.from[i] + (el.to[i] - el.from[i]) / 2;
    }

    mesh.position.set(...pos);
    console.log(`el ${i} at`, mesh.position);
    return mesh;
  });
}

async function createBlock(ident, scene) {
  const model = await buildUpModel(ident);
  const textures = await loadTextures(model);
  const geos = createGeometries(model);
  const materials = createMaterials(model, textures);
  const meshes = addMeshes(model, geos, materials, scene);

  return meshes;
}

export { createBlock };
