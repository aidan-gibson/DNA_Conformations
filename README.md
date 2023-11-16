This entire thing is fucking horrible and should be un-OOPed and simplified




src/main.js > src/World/World.js

import { loadBirds } from './components/birds/birds.js';
import { createCamera } from './components/camera.js';
import { createLights } from './components/lights.js';
import { createScene } from './components/scene.js';

import { createControls } from './systems/controls.js';
import { createRenderer } from './systems/renderer.js';
import { Resizer } from './systems/Resizer.js';
import { Loop } from './systems/Loop.js';

for testing, `npx vite --host` (host part so it's exposed so others on my net)


`npx vite build` outputs to dist/ for actual deployment


can get rid of birds.js and loadbirds junk etc