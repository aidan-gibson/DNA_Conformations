import Swal from 'sweetalert2'
// import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import { Resizer } from './World/systems/Resizer.js'
import { Loop } from './World/systems/Loop.js'
import { Color, Scene, WebGLRenderer, PerspectiveCamera, DirectionalLight, HemisphereLight } from 'three'
// import {Pane} from 'tweakpane'
import { VRButton } from 'three/addons/webxr/VRButton.js'
import iOS from 'is-ios'
import { noisyLinesBackground } from 'threejs-toys'

noisyLinesBackground({
	el: document.getElementById('backg'),
	colors: [0x0231c3, 0xa6d1f6],
	// colors: [0x87CEEB, 0x900C3F],
	minStroke: 0.5,
	maxStroke: 2,
	timeCoef: 0.0002,
	coordScale: 2,
	displacementScale: 0.02
})





let scene
let loop
let loader
let A_DNA_Data = null
let B_DNA_Data = null
let Z_DNA_Data = null
let G_DNA_Data = null
let C_DNA_Data = null
let E_DNA_Data = null
let H_DNA_Data = null
let I_DNA_Data = null
let ambient = new Audio('ambient.mp3')
let toggleButton = document.getElementById('toggleButton')

toggleButton.addEventListener('click', function() {
	if (ambient.paused) {
		ambient.play()
		toggleButton.textContent = 'Pause Ambient'
	} else {
		ambient.pause()
		toggleButton.textContent = 'Play Ambient'
	}
})
// works for EVERY click, but i just want buttons
// document.addEventListener('click', function() {
// 	var audio = new Audio('click.mp3')
// 	audio.play()
// })

// JUST buttons (not counting sweetalert buttons)
document.querySelectorAll('button').forEach(button => {
	button.addEventListener('click', function() {
		var audio = new Audio('click.mp3')
		audio.play()
	})
})



function initializeWorld(container) {

	// camera = createCamera()
	const camera = new PerspectiveCamera(65, window.innerWidth / window.innerHeight, 0.1, 1000)
	camera.position.set(0, 20, 45)
	camera.zoom = 1
	const renderer = new WebGLRenderer({ antialias: true, alpha: true })
	
	if(!iOS){
		renderer.xr.enabled = true
		document.body.appendChild( VRButton.createButton( renderer ) )}

	scene = new Scene()

	// scene.background = new Color('skyblue')
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
	// const pane = new Pane();


}



async function loadData() {
	A_DNA_Data = await loader.loadAsync('/assets/models/A_DNA.glb')
	A_DNA_Data.scene.rotation.set(Math.PI, Math.PI, Math.PI / 2)
	B_DNA_Data = await loader.loadAsync('/assets/models/B_DNA.glb')
	B_DNA_Data.scene.rotation.set(Math.PI, Math.PI, Math.PI / 2)
	G_DNA_Data = await loader.loadAsync('/assets/models/G_DNA.glb')
	G_DNA_Data.scene.rotation.set(Math.PI, Math.PI, Math.PI / 2)
	Z_DNA_Data = await loader.loadAsync('/assets/models/Z_DNA.glb')
	Z_DNA_Data.scene.rotation.set(Math.PI, Math.PI, Math.PI / 2)
	C_DNA_Data = await loader.loadAsync('/assets/models/C_DNA.glb')
	C_DNA_Data.scene.rotation.set(Math.PI, Math.PI, Math.PI / 2)
	E_DNA_Data = await loader.loadAsync('/assets/models/E_DNA.glb')
	E_DNA_Data.scene.rotation.set(Math.PI, Math.PI, Math.PI / 2)
	H_DNA_Data = await loader.loadAsync('/assets/models/H_DNA.glb')
	H_DNA_Data.scene.rotation.set(Math.PI, Math.PI, Math.PI / 2)
	I_DNA_Data = await loader.loadAsync('/assets/models/I_DNA.glb')
	I_DNA_Data.scene.rotation.set(Math.PI, Math.PI, Math.PI / 2)

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
        While we are commonly only taught about the most famous and predominant DNA conformation (B-DNA) there are actually <a href="https://en.wikipedia.org/w/index.php?title=Nucleic_acid_double_helix&useskin=vector#Helix_geometries" target="_blank">many different geometries</a> DNA can assume, given different conditions. This is an interactive, 3D exploration of those geometries. 

        This demo was made using raw macromolecular Crystallographic Information Files (mmCIF) publicly available from the <a href="https://www.rcsb.org" target="_blank">RCSB Protein Data Bank</a>. <br><br>More info on the file format  <a href="https://pdb101.rcsb.org/learn/guide-to-understanding-pdb-data/beginner%E2%80%99s-guide-to-pdb-structures-and-the-pdbx-mmcif-format" target="_blank">here</a>.
    `,
		icon: 'info',
		confirmButtonText: 'Onward!',
		showCancelButton: true,
		cancelButtonText: 'Onward (with sound)',
		cancelButtonColor: '#3085d6'
	}).then((result) => {
		if (result.dismiss === Swal.DismissReason.cancel) {
			ambient.play()
			toggleButton.textContent = 'Pause Ambient'
		}
	})

	document.querySelectorAll('#A-DNA, #B-DNA, #Z-DNA, #G-DNA, #C-DNA, #E-DNA, #H-DNA, #I-DNA').forEach(button => {
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
			          <br><br><a href="https://www.ncbi.nlm.nih.gov/books/NBK6545/" target="_blank">More Info</a> <br>
			  <a href="https://www.rcsb.org/structure/4izq" target="_blank">Crystallogrpahic Data Source</a>
			`,
					icon: 'info',
					confirmButtonText: 'Ayeaye!'
				})
				break
			case 'B':
				dnaInfo.textContent = 'Displaying B-DNA structure.'
				Swal.fire({
					title: 'B-DNA',
					html: `
			          B-DNA is the "normal" DNA geometry we're all used to. Strong evidence supports that DNA is predominantly in this form. 
			          <br><br><a href="https://www.nature.com/articles/nature01595" target="_blank">More Info</a> <br>
			  <a href="https://www.rcsb.org/structure/1zew" target="_blank">Crystallogrpahic Data Source</a>
			`,
					icon: 'info',
					confirmButtonText: "Boring, next!"
				})
				break
			case 'Z':
				dnaInfo.textContent = 'Displaying Z-DNA structure.'
				Swal.fire({
					title: 'Z-DNA',
					html: `
			          Segments of DNA that cells have methylated for regulatory purposes may adopt the Z geometry, in which the strands turn about the helical axis the opposite way to A-DNA and B-DNA. There is also evidence of protein-DNA complexes forming Z-DNA structures. 
			          <br><br><a href="https://link.springer.com/article/10.1007/s12551-019-00534-1" target="_blank">More Info</a> <br>
			  <a href="https://www.rcsb.org/structure/4ocb" target="_blank">Crystallogrpahic Data Source</a>
			`,
					icon: 'info',
					confirmButtonText: 'Zany!'
				})
				break
			case 'G':
				dnaInfo.textContent = 'Displaying G-quadruplex structure.'
				Swal.fire({
					title: 'G-quadruplex',
					html: `
			          G-quadruplex structures are helical in shape and can form one, two, or four strands. The shown G-quadruplex structure was formed by Bromo-substituted Human Telomeric DNA, and imaged via X-Ray Diffraction, like the others.   
			          <br><br><a href="https://academic.oup.com/nar/article/48/1/1/5637585" target="_blank">More Info</a> <br>
			  <a href="https://www.rcsb.org/structure/6jkn" target="_blank">Crystallogrpahic Data Source</a>
			`,
					icon: 'info',
					confirmButtonText: "Oh wow you're still here?"
				})
				break
			case 'C':
				dnaInfo.textContent = 'Displaying C-DNA structure.'
				Swal.fire({
					title: 'C-DNA',
					html: `
			          C-DNA (not to be confused with cDNA, complementary DNA) is, as far as we know, a purely synthetic DNA conformation. Low humidity and Lithium and Magnesium ions can induce this state, but we have not seen it occur naturally in vivo before. It is also relatively unstable.
			          <br><br><a href="https://bio.libretexts.org/Bookshelves/Genetics/Working_with_Molecular_Genetics_(Hardison)/Unit_I%3A_Genes_Nucleic_Acids_Genomes_and_Chromosomes/2%3A_Structures_of_Nucleic_Acids/2.5%3A_B-Form_A-Form_and_Z-Form_of_DNA" target="_blank">More Info</a> <br>
			  <a href="https://www.rcsb.org/structure/199D" target="_blank">Crystallogrpahic Data Source</a>
			`,
					icon: 'info',
					confirmButtonText: 'Cool!'
				})
				break
			case 'E':
				dnaInfo.textContent = 'Displaying E-DNA structure.'
				Swal.fire({
					title: 'E-DNA',
					html: `
			          E-DNA has not been found naturally; is an induced state via cytosine methylation or bromation. It is speculated to be an intermediate state between B-DNA and A-DNA. While it hasn't beeen studied as thoroughly as the other conformations, here has been extended interest by scientists to use E-DNA as a <a href="https://pubs.acs.org/doi/full/10.1021/ac500251t" target="_blank">biosensor to detect microRNAs (Lin et al 2014)</a>.    
			          <br><br><a href="https://www.nature.com/articles/nsb0900_758" target="_blank">More Info</a> <br>
			  <a href="https://www.rcsb.org/structure/1F6I" target="_blank">Crystallogrpahic Data Source</a>
			`,
					icon: 'info',
					confirmButtonText: 'What next?'
				})
				break
			case 'H':
				dnaInfo.textContent = 'Displaying H-DNA structure.'
				Swal.fire({
					title: 'H-DNA',
					html: `
			          H-DNA, also known as Triple-stranded DNA or Triplex-DNA, is essentially a conventional B-DNA molecule with an extra strand, forming a triple helix.    
			          <br><br><a href="https://pubs.rsc.org/en/content/articlehtml/2022/sc/d2sc01793h" target="_blank">More Info</a> <br>
			  <a href="https://www.rcsb.org/structure/1W86" target="_blank">Crystallogrpahic Data Source</a>
			`,
					icon: 'info',
					confirmButtonText: 'ur the 🧬🧬🧬 master wow'
				})
				break
			case 'I':
				dnaInfo.textContent = 'Displaying i-motif DNA structure.'
				Swal.fire({
					title: 'i-motif',
					html: `i-motif (intercalated-motif) DNA are similar to G-quadruplex discussed prior, the chief differentiation being that i-motif DNA are formed in cytosine-rich regions and G-quadruplex structures are formed in guanine-rich regions of DNA. This four-stranded structure was originally discovered <a href="https://www.nature.com/articles/363561a0" target="_blank">in vitro (Gehring et al 1993)</a> but a <a href="https://www.nature.com/articles/s41557-018-0046-3" target="_blank">2018 discovery (Zeraati et al)</a> found them in human nuclei.
                      
					<br><br><a href="https://academic.oup.com/nar/article/46/16/8038/5075032" target="_blank">More Info</a> <br> 
          <a href="https://www.rcsb.org/structure/8cxf" target="_blank">Crystallogrpahic Data Source</a>
        `,
					icon: 'info',
					confirmButtonText: '🫡'
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
