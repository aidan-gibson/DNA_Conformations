import Swal from 'sweetalert2'
import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import { Resizer } from './World/systems/Resizer.js'
import { Loop } from './World/systems/Loop.js'
import { Color, Scene, WebGLRenderer, PerspectiveCamera, DirectionalLight, HemisphereLight } from 'three'



let scene
let loop
let loader
let A_DNA_Data = null
let B_DNA_Data = null
let Z_DNA_Data = null
let G_DNA_Data = null




function initializeWorld(container) {
	// camera = createCamera()
	const camera = new PerspectiveCamera(65, window.innerWidth / window.innerHeight, 0.1, 1000)
	camera.position.set(0, 20, 45)
	camera.zoom = 1
	const renderer = new WebGLRenderer({ antialias: true })
	scene = new Scene()

	scene.background = new Color('skyblue')
	loop = new Loop(camera, scene, renderer)
	container.append(renderer.domElement)

	const controls = new OrbitControls(camera, renderer.domElement)
	controls.enableDamping = true
	controls.autoRotate = true
	controls.autoRotateSpeed = 2.5
	controls.tick = () => controls.update()

	const ambientLight = new HemisphereLight(
		'white',
		'darkslategrey',
		5,
	)

	const mainLight = new DirectionalLight('white', 4)
	mainLight.position.set(10, 10, 10)

	loader = new GLTFLoader()
	loop.updatables.push(controls)
	scene.add(ambientLight, mainLight)

	new Resizer(container, camera, renderer)



}



async function loadData() {
	A_DNA_Data = await loader.loadAsync('/assets/models/A_DNA.glb')
	A_DNA_Data.scene.rotation.set(Math.PI, Math.PI, Math.PI / 2)
	B_DNA_Data = await loader.loadAsync('/assets/models/B_DNA.glb')
	B_DNA_Data.scene.rotation.set(Math.PI, Math.PI, Math.PI / 2)
	G_DNA_Data = await loader.loadAsync('/assets/models/G_DNA.glb')
	G_DNA_Data.scene.rotation.set(Math.PI, Math.PI, Math.PI / 2)
	Z_DNA_Data = await loader.loadAsync('/assets/models/Z_DNA.glb')
	G_DNA_Data.scene.rotation.set(Math.PI, Math.PI, Math.PI / 2)

}

async function init(dnaType) {
	// removes any other dna first
	scene.getObjectsByProperty('type', 'Group').forEach(object => {
		scene.remove(object)
	})
	const dnaDataObject = eval(`${dnaType}_DNA_Data`)
	scene.add(dnaDataObject.scene)
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
	await loadData()
	// await init('B') //TODO
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
