import './style.css'
import * as THREE from 'three'
import { scene } from './chess_experiance'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

// sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
}

window.addEventListener('resize', ()=>{
  // update sizes
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight
  // update camera
  camera.aspect = sizes.width/sizes.height
  camera.updateProjectionMatrix()
  // update renderer
  renderer.setSize(sizes.width, sizes.height)
  renderer.render(scene, camera)
})

// camera
const camera = new THREE.PerspectiveCamera(75, sizes.width/sizes.height)
camera.position.z = 4
camera.position.y = 7
camera.rotation.x = -Math.PI*3/4
scene.add(camera)

// canvas
const canvas = document.querySelector('canvas.webgl')

// renderer
const renderer = new THREE.WebGLRenderer({
  canvas
})
renderer.setSize(sizes.width,sizes.height)
renderer.render(scene, camera)

// orbit controls
const orbControls = new OrbitControls(camera, renderer.domElement)

// game loop
function game_loop() {
  requestAnimationFrame(game_loop)
  orbControls.update()
  renderer.render(scene, camera)
}

game_loop()

export {
  renderer,
  camera,
}
