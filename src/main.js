import { World } from './World/World.js';
let world;


async function main() {
  // Get a reference to the container element
  const container = document.querySelector('#scene-container');

  // create a new world
  world = new World(container);

  // complete async tasks
  await world.init();

  // start the animation loop
  world.start();

  // Add event listeners for the buttons
  document.getElementById('A-DNA').addEventListener('click', initADNA);
  document.getElementById('B-DNA').addEventListener('click', initBDNA);
  document.getElementById('Z-DNA').addEventListener('click', initZDNA);

}

async function initADNA() {
  await world.adna_scene();
}

async function initBDNA() {
  await world.bdna_scene();
}

async function initZDNA() {
  await world.zdna_scene();
}

main().catch((err) => {
  console.error(err);
});
