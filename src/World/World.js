import { loadBirds } from './components/birds/birds.js';
import { createCamera } from './components/camera.js';
import { createLights } from './components/lights.js';
import { createScene } from './components/scene.js';

import { createControls } from './systems/controls.js';
import { createRenderer } from './systems/renderer.js';
import { Resizer } from './systems/Resizer.js';
import { Loop } from './systems/Loop.js';
import { GUI } from 'dat.gui'



let camera;
let controls;
let renderer;
let scene;
let loop;

class World {
  constructor(container) {
    camera = createCamera();
    renderer = createRenderer();
    scene = createScene();
    loop = new Loop(camera, scene, renderer);
    container.append(renderer.domElement);
    controls = createControls(camera, renderer.domElement);

    const { ambientLight, mainLight } = createLights();

    loop.updatables.push(controls);
    scene.add(ambientLight, mainLight);

    const resizer = new Resizer(container, camera, renderer);


  }

  async init() {
    const { A_DNA, B_DNA, Z_DNA } = await loadBirds();

    // move the target to the center of the front bird
    // controls.target.copy(Z_DNA.position);

    // scene.add(A_DNA, B_DNA);
    scene.add(Z_DNA);


    // adjust camera
    // camera.position.set(-11.5, 1.5, 6.5);

    // GUI
    const gui = new GUI()
    const cubeFolder = gui.addFolder('Z-DNA')
    cubeFolder.add(Z_DNA.rotation, 'x', 0, Math.PI * 2)
    cubeFolder.add(Z_DNA.rotation, 'y', 0, Math.PI * 2)
    cubeFolder.add(Z_DNA.rotation, 'z', 0, Math.PI * 2)
    cubeFolder.open()

    const cameraFolder = gui.addFolder('Camera')
    cameraFolder.add(camera.position, 'z', 0, 10)
    // cameraFolder.add(camera.zoom, 'zoom')
    cameraFolder.open()
  }

  render() {
    renderer.render(scene, camera);
  }

  start() {
    loop.start();

  }

  stop() {
    loop.stop();
  }
}

export { World };
