import { World } from './World/World.js';
let world;

async function main() {
  const container = document.querySelector('#scene-container');
  world = new World(container);
  await world.init('A');
  world.start();

  const dnaInfo = document.getElementById('dna-info');

  document.querySelectorAll('#A-DNA, #B-DNA, #Z-DNA').forEach(button => {
    button.addEventListener('click', async (event) => {
      const dnaType = event.target.id.split('-')[0];
      await world.init(dnaType);

      // Update the text based on the button clicked
      switch (dnaType) {
        case 'A':
          dnaInfo.textContent = 'Displaying A-DNA structure.';
          break;
        case 'B':
          dnaInfo.textContent = 'Displaying B-DNA structure.';
          break;
        case 'Z':
          dnaInfo.textContent = 'Displaying Z-DNA structure.';
          break;
        default:
          dnaInfo.textContent = 'Select a DNA type';
      }
    });
  });
}

main().catch((err) => {
  console.error(err);
});
