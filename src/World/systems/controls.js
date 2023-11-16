import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

function createControls(camera, canvas) {
  const controls = new OrbitControls(camera, canvas);

  controls.enableDamping = true;
  controls.autoRotate = true;
  controls.autoRotateSpeed = 2.5;
  // controls.enableZoom = false;
  // forward controls.update to our custom .tick method
  controls.tick = () => controls.update();

  return controls;
}

export { createControls };
