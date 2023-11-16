import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { setupModel } from './setupModel.js';

async function loadBirds() {
  const loader = new GLTFLoader();

  const [parrotData, flamingoData, storkData, A_DNA] = await Promise.all([
    loader.loadAsync('/assets/models/Parrot.glb'),
    loader.loadAsync('/assets/models/Flamingo.glb'),
    loader.loadAsync('/assets/models/Stork.glb'),
    // loader.loadAsync('/assets/models/7ECG.glb'),
    loader.loadAsync('/assets/models/A_DNA.glb'),
    // loader.loadAsync('/assets/models/B-DNA.glb'),
    // loader.loadAsync('/assets/models/C-DNA.glb'),
  ]);

  console.log('Squaaawk!', parrotData);
  console.log('Squaaawk!', A_DNA);

  const parrot = setupModel(parrotData);
  parrot.position.set(0, 0, 2.5);

  const flamingo = setupModel(flamingoData);
  flamingo.position.set(7.5, 0, -10);

  const stork = setupModel(storkData);
  stork.position.set(0, -2.5, -10);

  // const DNA = setupModel(A_DNA);
  const DNA = A_DNA.scene;
  DNA.position.set(10, -2.5, -10);

  return {
    parrot,
    flamingo,
    stork,
    DNA,
  };
}

export { loadBirds };
