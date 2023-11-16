import Swal from 'sweetalert2'
import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import { createLights } from './World/components/lights.js'
import { createScene } from './World/components/scene.js'
import { Resizer } from './World/systems/Resizer.js'
import { Loop } from './World/systems/Loop.js'
import { Color, Scene } from 'three'
import { WebGLRenderer } from 'three'
import { PerspectiveCamera } from 'three'




let scene
let loop
let loader
let A_DNA = null
let B_DNA = null
let Z_DNA = null
let G_DNA = null




function initializeWorld(container) {
	// camera = createCamera()
	const camera = new PerspectiveCamera(65, window.innerWidth / window.innerHeight, 0.1, 1000)
	camera.position.set(0, 20, 45)
	camera.zoom = 1
	const renderer = new WebGLRenderer({ antialias: true })
	scene = createScene()
	loop = new Loop(camera, scene, renderer)
	container.append(renderer.domElement)

	const controls = new OrbitControls(camera, renderer.domElement)
	controls.enableDamping = true
	controls.autoRotate = true
	controls.autoRotateSpeed = 2.5
	controls.tick = () => controls.update()

	const { ambientLight, mainLight } = createLights()
	loader = new GLTFLoader()
	loop.updatables.push(controls)
	scene.add(ambientLight, mainLight)

	new Resizer(container, camera, renderer)
}

// loadDNA function
async function init(dnaType) {
	switch (dnaType) {
	case 'A':
		if (B_DNA) {
			console.log('Removing B_DNA:', B_DNA)
			scene.remove(B_DNA)
		}
		if (Z_DNA) {
			console.log('Removing Z_DNA:', Z_DNA)
			scene.remove(Z_DNA)
		}
		if (G_DNA) {
			console.log('Removing G_DNA:', G_DNA)
			scene.remove(G_DNA)
		}
		if (!A_DNA) {
			let A_DNA_Data = await loader.loadAsync('/assets/models/A_DNA.glb')
			A_DNA = A_DNA_Data.scene
			//originally this was data.scene.children[0]; to just get first one
			A_DNA.rotation.set(Math.PI, Math.PI, Math.PI / 2)
		}
		scene.add(A_DNA)
		break
	case 'B':
		if (G_DNA) {
			console.log('Removing G_DNA:', G_DNA)
			scene.remove(G_DNA)
		}
		if (A_DNA) {
			console.log('Removing A_DNA:', A_DNA)
			scene.remove(A_DNA)
		}
		if (Z_DNA) {
			console.log('Removing Z_DNA:', Z_DNA)
			scene.remove(Z_DNA)
		}
		if (!B_DNA) {
			let B_DNA_Data = await loader.loadAsync('/assets/models/B_DNA.glb')
			B_DNA = B_DNA_Data.scene
			B_DNA.rotation.set(Math.PI, Math.PI, Math.PI / 2)
		}
		scene.add(B_DNA)
		break
	case 'Z':
		if (G_DNA) {
			console.log('Removing G_DNA:', G_DNA)
			scene.remove(G_DNA)
		}
		if (A_DNA) {
			console.log('Removing A_DNA:', A_DNA)
			scene.remove(A_DNA)
		}
		if (B_DNA) {
			console.log('Removing B_DNA:', B_DNA)
			scene.remove(B_DNA)
		}
		if (!Z_DNA) {
			let Z_DNA_Data = await loader.loadAsync('/assets/models/Z_DNA.glb')
			Z_DNA = Z_DNA_Data.scene
			Z_DNA.rotation.set(Math.PI, Math.PI, Math.PI / 2)
		}
		scene.add(Z_DNA)
		break
	case 'G': // New case for 'G'
		if (A_DNA) {
			console.log('Removing A_DNA:', A_DNA)
			scene.remove(A_DNA)
		}
		if (B_DNA) {
			console.log('Removing B_DNA:', B_DNA)
			scene.remove(B_DNA)
		}
		if (Z_DNA) {
			console.log('Removing Z_DNA:', Z_DNA)
			scene.remove(Z_DNA)
		}
		if (!G_DNA) {
			let G_DNA_Data = await loader.loadAsync('/assets/models/G_DNA.glb')
			G_DNA = G_DNA_Data.scene
			G_DNA.rotation.set(Math.PI, Math.PI, Math.PI / 2)
		}
		scene.add(G_DNA)
		break
	default:
		console.error('Invalid DNA type')
	}
}

function start() {
	loop.start()

}

function stop() {
	loop.stop()
}

async function main() {
	const container = document.querySelector('#scene-container')
	initializeWorld(container)
	await init('A')
	start()

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
			await init(dnaType)

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
