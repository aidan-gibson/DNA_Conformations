import { World } from './World/World.js';
let world;
async function main() {
  // Get a reference to the container element
  const container = document.querySelector('#scene-container');

  // create a new world
  world = new World(container);
  // complete async tasks
  await world.init('A');

  // start the animation loop
  world.start();

  // Add a single event listener for all buttons
  document.querySelectorAll('#A-DNA, #B-DNA, #Z-DNA').forEach(button => {
    button.addEventListener('click', async (event) => {
      const dnaType = event.target.id.split('-')[0]; // Extracts 'A', 'B', or 'Z' from the ID
      await world.init(dnaType);
    });
  });
}

main().catch((err) => {
  console.error(err);
});
