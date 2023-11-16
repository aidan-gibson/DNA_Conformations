import { PerspectiveCamera } from 'three';

function createCamera() {
  // FOV, aspect, near, far
  const camera = new PerspectiveCamera(35, 1, 0.1, 100);

  camera.position.set(-1.5, 1.5, 6.5);
  camera.zoom = 1;
  return camera;
}

export { createCamera };
