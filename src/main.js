import Swal from 'sweetalert2'
import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import { createCamera } from './World/components/camera.js'
import { createLights } from './World/components/lights.js'
import { createScene } from './World/components/scene.js'
import { createRenderer } from './World/systems/renderer.js'
import { Resizer } from './World/systems/Resizer.js'
import { Loop } from './World/systems/Loop.js'
import { Color, Scene } from 'three'


let world
let camera
let controls
let renderer
let scene
let loop
let loader

class World {
	constructor(container) {
		camera = createCamera()
		renderer = createRenderer()
		scene = createScene()
		loop = new Loop(camera, scene, renderer)
		container.append(renderer.domElement)



		const controls = new OrbitControls(camera, renderer.domElement)

		controls.enableDamping = true
		controls.autoRotate = true
		controls.autoRotateSpeed = 2.5
		// controls.enableZoom = false;
		// forward controls.update to our custom .tick method
		controls.tick = () => controls.update()




		const { ambientLight, mainLight } = createLights()
		loader = new GLTFLoader()
		loop.updatables.push(controls)
		scene.add(ambientLight, mainLight)
		this.A_DNA = null
		this.B_DNA = null
		this.Z_DNA = null
		this.G_DNA = null

		const resizer = new Resizer(container, camera, renderer)
	}
  
	async init(dnaType) {
		switch (dnaType) {
		case 'A':
			if (this.B_DNA) {
				console.log('Removing B_DNA:', this.B_DNA)
				scene.remove(this.B_DNA)
			}
			if (this.Z_DNA) {
				console.log('Removing Z_DNA:', this.Z_DNA)
				scene.remove(this.Z_DNA)
			}
			if (this.G_DNA) {
				console.log('Removing G_DNA:', this.G_DNA)
				scene.remove(this.G_DNA)
			}
			if (!this.A_DNA) {
				let A_DNA_Data = await loader.loadAsync('/assets/models/A_DNA.glb')
				this.A_DNA = A_DNA_Data.scene
				//originally this was data.scene.children[0]; to just get first one
				this.A_DNA.rotation.set(Math.PI, Math.PI, Math.PI / 2)
			}
			scene.add(this.A_DNA)
			break
		case 'B':
			if (this.G_DNA) {
				console.log('Removing G_DNA:', this.G_DNA)
				scene.remove(this.G_DNA)
			}
			if (this.A_DNA) {
				console.log('Removing A_DNA:', this.A_DNA)
				scene.remove(this.A_DNA)
			}
			if (this.Z_DNA) {
				console.log('Removing Z_DNA:', this.Z_DNA)
				scene.remove(this.Z_DNA)
			}
			if (!this.B_DNA) {
				let B_DNA_Data = await loader.loadAsync('/assets/models/B_DNA.glb')
				this.B_DNA = B_DNA_Data.scene
				this.B_DNA.rotation.set(Math.PI, Math.PI, Math.PI / 2)
			}
			scene.add(this.B_DNA)
			break
		case 'Z':
			if (this.G_DNA) {
				console.log('Removing G_DNA:', this.G_DNA)
				scene.remove(this.G_DNA)
			}
			if (this.A_DNA) {
				console.log('Removing A_DNA:', this.A_DNA)
				scene.remove(this.A_DNA)
			}
			if (this.B_DNA) {
				console.log('Removing B_DNA:', this.B_DNA)
				scene.remove(this.B_DNA)
			}
			if (!this.Z_DNA) {
				let Z_DNA_Data = await loader.loadAsync('/assets/models/Z_DNA.glb')
				this.Z_DNA = Z_DNA_Data.scene
				this.Z_DNA.rotation.set(Math.PI, Math.PI, Math.PI / 2)
			}
			scene.add(this.Z_DNA)
			break
		case 'G': // New case for 'G'
			if (this.A_DNA) {
				console.log('Removing A_DNA:', this.A_DNA)
				scene.remove(this.A_DNA)
			}
			if (this.B_DNA) {
				console.log('Removing B_DNA:', this.B_DNA)
				scene.remove(this.B_DNA)
			}
			if (this.Z_DNA) {
				console.log('Removing Z_DNA:', this.Z_DNA)
				scene.remove(this.Z_DNA)
			}
			if (!this.G_DNA) {
				let G_DNA_Data = await loader.loadAsync('/assets/models/G_DNA.glb')
				this.G_DNA = G_DNA_Data.scene
				this.G_DNA.rotation.set(Math.PI, Math.PI, Math.PI / 2)
			}
			scene.add(this.G_DNA)
			break
		default:
			console.error('Invalid DNA type')
		}
	}
  

	// async init() {
	//   const { A_DNA, B_DNA, Z_DNA } = await loadBirds();
	//   scene.add(A_DNA);
	//   scene.add(B_DNA);
	//   scene.remove(B_DNA);

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
	// }

	render() {
		renderer.render(scene, camera)
	}

	start() {
		loop.start()

	}

	stop() {
		loop.stop()
	}
}





async function main() {
	const container = document.querySelector('#scene-container')
	world = new World(container)
	await world.init('A')
	world.start()

	const dnaInfo = document.getElementById('dna-info')
	Swal.fire({
		title: 'DNA Helix Geometries',
		html: `
    While we are commonly only taught about the most famous and predominant DNA conformation (B-DNA) there are actually <a href="https://en.wikipedia.org/w/index.php?title=Nucleic_acid_double_helix&useskin=vector#Helix_geometries">many different geometries</a> DNA can assume, given different conditions. This is an interactive, 3D exploration of those geometries. 
    <br>
This demo was made using raw macromolecular Crystallographic Information Files (mmCIF) publicly available from the <a href="https://www.rcsb.org/RCSB">RCSB Protein Data Bank</a>. <br><br>More info on the file format  <a href="https://pdb101.rcsb.org/learn/guide-to-understanding-pdb-data/beginner%E2%80%99s-guide-to-pdb-structures-and-the-pdbx-mmcif-format">here</a>.
`,
		icon: 'info',
		confirmButtonText: 'Cool'
	})
	document.querySelectorAll('#A-DNA, #B-DNA, #Z-DNA, #G-DNA').forEach(button => {
		button.addEventListener('click', async (event) => {
			const dnaType = event.target.id.split('-')[0]
			await world.init(dnaType)

			// Update the text based on the button clicked
			switch (dnaType) {
			case 'A':
				dnaInfo.textContent = 'Displaying A-DNA structure.'
				Swal.fire({
					title: 'A-DNA',
					html: `
            It was long thought that the A form only occurs in dehydrated samples of DNA in the laboratory, such as those used in crystallographic experiments, and in hybrid pairings of DNA and RNA strands, but DNA dehydration does occur in vivo, and A-DNA is now known to have biological functions. 
            <br><a href="https://en.wikipedia.org/wiki/A-DNA?useskin=vector">More Info</a> <br>
    <a href="https://www.rcsb.org/structure/4izq">Crystallogrpahic Data Source</a>
  `,
					icon: 'info',
					confirmButtonText: 'Cool'
				})
				break
			case 'B':
				dnaInfo.textContent = 'Displaying B-DNA structure.'
				Swal.fire({
					title: 'B-DNA',
					html: `
            B-DNA is the "normal" DNA geometry we're all used to. Strong evidence supports that DNA is predominantly in this form. 
            <br><a href="https://www.nature.com/articles/nature01595">More Info</a> <br>
    <a href="https://www.rcsb.org/structure/1zew">Crystallogrpahic Data Source</a>
  `,
					icon: 'info',
					confirmButtonText: 'Cool'
				})
				break
			case 'Z':
				dnaInfo.textContent = 'Displaying Z-DNA structure.'
				Swal.fire({
					title: 'Z-DNA',
					html: `
            Segments of DNA that cells have methylated for regulatory purposes may adopt the Z geometry, in which the strands turn about the helical axis the opposite way to A-DNA and B-DNA. There is also evidence of protein-DNA complexes forming Z-DNA structures. 
            <br><a href="https://en.wikipedia.org/wiki/Z-DNA?useskin=vector">More Info</a> <br>
    <a href="https://www.rcsb.org/structure/4ocb">Crystallogrpahic Data Source</a>
  `,
					icon: 'info',
					confirmButtonText: 'Cool'
				})
				break
			case 'G':
				dnaInfo.textContent = 'Displaying G-quadruplex structure.'
				Swal.fire({
					title: 'G-quadruplex',
					html: `
            G-quadruplex structures are helical in shape and can form one, two, or four strands. The shown G-quadruplex structure was formed by Bromo-substituted Human Telomeric DNA, and imaged via X-Ray Diffraction, like the others.   
            <br><a href="https://en.wikipedia.org/wiki/G-quadruplex?useskin=vector">More Info</a> <br>
    <a href="https://www.rcsb.org/structure/6jkn">Crystallogrpahic Data Source</a>
  `,
					icon: 'info',
					confirmButtonText: 'Cool'
				})
				break
			default:
				dnaInfo.textContent = 'Select a DNA type'
			}
		})
	})
}

main().catch((err) => {
	console.error(err)
})
