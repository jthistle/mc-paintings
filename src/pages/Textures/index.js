import React, { useEffect, useRef, useState } from 'react';
import { useMatch } from '@reach/router';

import Layout, { Column } from '../../components/Layout';

import * as THREE from 'three';

import { createBlock } from '../../textures';

const ROTATE_SPEED = 0.005;
const ZOOM_SPEED = 0.03;
const ZOOM_MAX = 100.0;
const ZOOM_MIN = 20.0;

const Textures = () => {
  const rendererRef = useRef();
  const width = 600,
    height = 600;
  const [ctx, setContext] = useState();
  const [dragging, setDragging] = useState(false);
  const [cameraRotation, setCameraRotation] = useState(
    new THREE.Vector2(0.5, 0.5)
  );
  const [cameraZoom, setCameraZoom] = useState(30);

  const match = useMatch('/textures/:block');

  const updateCameraPos = (rot, zoom) => {
    const rotx = new THREE.Quaternion().setFromAxisAngle(
      new THREE.Vector3(0, 1, 0),
      rot.x
    );
    const roty = new THREE.Quaternion().setFromAxisAngle(
      new THREE.Vector3(1, 0, 0),
      -rot.y
    );
    const fullRot = rotx.multiply(roty);
    const vector = new THREE.Vector3(0, 0, zoom);
    vector.applyQuaternion(fullRot);

    ctx.camera.position.copy(vector);
    ctx.camera.lookAt(new THREE.Vector3(0, 0, 0));

    ctx.renderer.render(ctx.scene, ctx.camera);
    ctx.camera.updateProjectionMatrix(); // TODO remove?
  };

  const mouseMove = (event) => {
    if (!dragging) return;

    const [moveX, moveY] = [event.movementX, event.movementY];
    setCameraRotation((rot) => {
      const LIM = Math.PI / 2 - 0.0001;

      let newRot = new THREE.Vector2(
        rot.x + moveX * -ROTATE_SPEED,
        Math.min(LIM, Math.max(-LIM, rot.y + moveY * ROTATE_SPEED))
      );

      updateCameraPos(newRot, cameraZoom);

      return newRot;
    });
  };

  const zoom = (event) => {
    const delY = event.deltaY;
    setCameraZoom((zoom) => {
      let newZoom = Math.max(
        ZOOM_MIN,
        Math.min(ZOOM_MAX, zoom * (1 + ZOOM_SPEED * delY))
      );
      updateCameraPos(cameraRotation, newZoom);
      return newZoom;
    });
  };

  useEffect(() => {
    if (!rendererRef.current) return;

    const camera = new THREE.PerspectiveCamera(70, width / height, 0.01, 1000);

    const scene = new THREE.Scene();

    const axesHelper = new THREE.AxesHelper(16);
    scene.add(axesHelper);

    createBlock(`minecraft:block/${match.block}`, scene).then(() => {
      console.log('done');
      renderer.render(scene, camera);
    });

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    rendererRef.current.appendChild(renderer.domElement);

    const ctx = {
      scene,
      camera,
      renderer,
    };

    setContext(ctx);
  }, [rendererRef]);

  useEffect(() => {
    if (!ctx) return;
    updateCameraPos(cameraRotation, cameraZoom);
  }, [ctx]);

  return (
    <Layout>
      <Column>
        <div
          ref={rendererRef}
          onMouseDown={() => setDragging(true)}
          onMouseUp={() => setDragging(false)}
          onMouseMove={mouseMove}
          onWheel={zoom}
        ></div>
      </Column>
    </Layout>
  );
};

export default Textures;
