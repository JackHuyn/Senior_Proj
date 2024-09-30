import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import './style.css'
import * as THREE from 'three'
import * as experiance from './chess_experiance.js'

// page sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}

// camera
// camera
const camera = new THREE.PerspectiveCamera(75, sizes.width/sizes.height)
camera.position.z = 9
camera.position.y = 7
camera.position.x = 4
experiance.scene.add(camera)

// canvas
const canvas = document.querySelector('canvas.webgl')

// renderer
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(sizes.width,sizes.height)

renderer.render(experiance.scene,camera)

// resizing
window.addEventListener('resize',
  ()=>{
    // update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight
    // update camera
    camera.aspect = sizes.width/sizes.height
    camera.updateProjectionMatrix()
    // update renderer
    renderer.setSize(sizes.width,sizes.height)
    renderer.render(experiance.scene,camera)
  }
)

// orbit controls
const orbControls = new OrbitControls(camera, renderer.domElement)

function game_loop() {
  requestAnimationFrame(game_loop)
  orbControls.update()
  renderer.render(experiance.scene, camera)
}

game_loop(
  renderer,
  camera
)

export {
  renderer,
  camera
}