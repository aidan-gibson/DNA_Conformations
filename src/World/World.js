import { createCamera } from './components/camera.js'
import { createLights } from './components/lights.js'
import { createScene } from './components/scene.js'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import { createControls } from './systems/controls.js'
import { createRenderer } from './systems/renderer.js'
import { Resizer } from './systems/Resizer.js'
import { Loop } from './systems/Loop.js'
import { GUI } from 'dat.gui'
import { Color, Scene } from 'three'


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
		controls = createControls(camera, renderer.domElement)
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

export { World }
