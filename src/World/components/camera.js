import { PerspectiveCamera } from 'three'

function createCamera() {
	// FOV, aspect, near, far
	// const camera = new PerspectiveCamera(35, 1, 0.1, 100);
	const camera = new PerspectiveCamera(65, window.innerWidth / window.innerHeight, 0.1, 1000)
	// camera.position.set(-1.5, 1.5, 6.5);
	// x,y,z
	camera.position.set(0, 20, 45)
	camera.zoom = 1
	return camera
}

export { createCamera }














  

// 	// async init() {
// 	//   const { A_DNA, B_DNA, Z_DNA } = await loadBirds();
// 	//   scene.add(A_DNA);
// 	//   scene.add(B_DNA);
// 	//   scene.remove(B_DNA);

// 	// move the target to the center of the front bird
// 	// controls.target.copy(Z_DNA.position);

// 	// scene.add(A_DNA, B_DNA);
// 	// scene.add(B_DNA);
// 	// scene.remove(A_DNA);

// 	// adjust camera
// 	// camera.position.set(-11.5, 1.5, 6.5);
// 	// controls.update();
// 	//controls.update() must be called after any manual changes to the camera's transform
// 	// GUI
// 	// const gui = new GUI()
// 	// // 
// 	// const cubeFolder = gui.addFolder('B-DNA')
// 	// cubeFolder.add(B_DNA.rotation, 'x', 0, Math.PI * 2)
// 	// cubeFolder.add(B_DNA.rotation, 'y', 0, Math.PI * 2)
// 	// cubeFolder.add(B_DNA.rotation, 'z', 0, Math.PI * 2)
// 	// cubeFolder.open()
    

// 	// const cameraFolder = gui.addFolder('Camera')
// 	// cameraFolder.add(camera.position, 'z', 0, 10)
// 	// // cameraFolder.add(camera.zoom, 'zoom')
// 	// cameraFolder.open()
// 	// }

// 	render() {
// 		renderer.render(scene, camera)
// 	}

// 	start() {
// 		loop.start()

// 	}

// 	stop() {
// 		loop.stop()
// 	}
// }