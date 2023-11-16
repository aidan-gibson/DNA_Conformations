This entire thing is fucking horrible and should be un-OOPed and simplified







# building / testing
for testing, `npx vite --host` (host part so it's exposed so others on my net)
`npx vite build` outputs to dist/ for actual deployment





# todo

* de-oop / general cleanup
  * yeet other js files
  * denastify the scene.add / scene.remove bs
  * typescript
  * go thru three.js docs, learn it all (it's finite) redo things as i go

src/main.js > src/World/World.js

* cookie to remember the init start open popup (dies in 5 min or smth short)
* About link
* optimize vite?

better "select a DNA type" (bc there's gonna be a lot)
background
clicky satisfying sound effects
music
optim favicons
link to repo (gh icon in upper right corner or smth)
WebXR (VR/AR test)



# logistical

eslint stuff
`npm init @eslint/config`
What type of modules does ur proj use? Javascript modules (import / export)
config in js bc that's the latest https://eslint.org/docs/latest/use/configure/configuration-files-new `.eslintrc.js`
typescript: yes
code runs in: node (not browser)
tabs
single quotes
no semi-colons


use vite, not webpack
`vite.config.ts`
`vite-plugin-ssr`

`npm run dev` to do locally
`npm run build`


`tsconfig.json`
`tsconfig.node.json`


replace datgui with tweakpane
`npm install --save tweakpane`
Additional type definitions for development in TypeScript
`npm install --save-dev @tweakpane/core`
import {Pane} from 'tweakpane';
const pane = new Pane();
https://tweakpane.github.io/docs/quick-tour/