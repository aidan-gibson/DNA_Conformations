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

    A_DNA=null;
    B_DNA=null;
    Z_DNA=null;
  }
  
  async adna_scene() {
    // const { A_DNA, B_DNA, Z_DNA } = await loadBirds();
    scene.remove(B_DNA);
    scene.remove(Z_DNA);
    scene.add(A_DNA);
  }
  async bdna_scene() {
    // const { A_DNA, B_DNA, Z_DNA } = await loadBirds();
    scene.remove(A_DNA);
    scene.remove(Z_DNA);
    scene.add(B_DNA);
  }
  async zdna_scene() {
    // const { A_DNA, B_DNA, Z_DNA } = await loadBirds();
    scene.remove(B_DNA);
    scene.remove(A_DNA);
    scene.remove(Z_DNA);
  }
  async init() {
    // const { A_DNA, B_DNA, Z_DNA } = await loadBirds();
    // let { A_DNA, B_DNA, Z_DNA } = await loadBirds();

    const loadedBirds = await loadBirds();
    A_DNA = loadedBirds.A_DNA;
    B_DNA = loadedBirds.B_DNA;
    Z_DNA = loadedBirds.Z_DNA;


    // move the target to the center of the front bird
    // controls.target.copy(Z_DNA.position);

    // scene.add(A_DNA, B_DNA);
    // scene.add(B_DNA);
    // scene.remove(A_DNA);

    // adjust camera
    // camera.position.set(-11.5, 1.5, 6.5);
    // controls.update();
    //controls.update() must be called after any manual changes to the camera's transform
    // GUI
    // const gui = new GUI()
    // // 
    // const cubeFolder = gui.addFolder('B-DNA')
    // cubeFolder.add(B_DNA.rotation, 'x', 0, Math.PI * 2)
    // cubeFolder.add(B_DNA.rotation, 'y', 0, Math.PI * 2)
    // cubeFolder.add(B_DNA.rotation, 'z', 0, Math.PI * 2)
    // cubeFolder.open()
    

    // const cameraFolder = gui.addFolder('Camera')
    // cameraFolder.add(camera.position, 'z', 0, 10)
    // // cameraFolder.add(camera.zoom, 'zoom')
    // cameraFolder.open()
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
