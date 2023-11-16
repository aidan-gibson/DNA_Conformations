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
