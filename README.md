This entire thing is fucking horrible and should be un-OOPed and simplified







# building / testing
for testing, `npx vite --host` (host part so it's exposed so others on my net)
`npx vite build` outputs to dist/ for actual deployment





# todo

* de-oop / general cleanup
  * de-oop World; shouldn't b using classes
  * typescript
  * go thru three.js docs, learn it all (it's finite) redo things as i go
src/main.js > src/World/World.js

* cookie to remember the init start open popup (dies in 5 min or smth short)
* About link

import { createCamera } from './components/camera.js';
import { createLights } from './components/lights.js';
import { createScene } from './components/scene.js';

import { createControls } from './systems/controls.js';
import { createRenderer } from './systems/renderer.js';
import { Resizer } from './systems/Resizer.js';
import { Loop } from './systems/Loop.js';

better "select a DNA type" (bc there's gonna be a lot)
background
clicky satisfying sound effects
music
optim favicons
link to repo (gh icon in upper right corner or smth)
WebXR (VR/AR test)