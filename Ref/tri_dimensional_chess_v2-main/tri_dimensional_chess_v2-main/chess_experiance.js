import * as THREE from 'three'
import { board } from './board'
import { attack_board } from './attack_board'
import { renderer, camera } from './main'

// scene
const scene = new THREE.Scene()

// lights
const lights = new THREE.Group()

const ambientLight = new THREE.AmbientLight()
ambientLight.name = "amb_light"
const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
directionalLight.name = "dir_light"
directionalLight.position.y = 2

lights.add(ambientLight,directionalLight)
scene.add(lights)

// custom geometry (stars)
const stars_geometry = new THREE.BufferGeometry()
const star_count = 1400

const star_positions = new Float32Array(star_count * 3)

const stars_geometry_radius = 70

for(let i = 0; i < star_count*3; i+=3){
  const u = Math.random()
  const v = Math.random()
  const theta = 2 * Math.PI * u
  const phi = Math.acos(2*v-1)
  star_positions[i] = stars_geometry_radius * Math.sin(phi) * Math.cos(theta)
  star_positions[i+1] = stars_geometry_radius * Math.sin(phi) * Math.sin(theta)
  star_positions[i+2] = stars_geometry_radius * Math.cos(phi)
}

stars_geometry.setAttribute('position', new THREE.BufferAttribute(star_positions, 3))

const stars_material = new THREE.PointsMaterial()
stars_material.size = 0.2
stars_material.sizeAttenuation = true

const stars = new THREE.Points(stars_geometry, stars_material)
stars.name = "stars"
scene.add(stars)

// main boards

const boards = [
  new board('w',4,1), // white board
  new board('n',4,3), // neutral board
  new board('b',4,5), // black board
]

// attack_boards

const attack_boards = []

boards.forEach(
  (b) => {
    b.corner_squares.forEach(
      (c)=>{
        // determine if either of the 2 attack boards need to be active or not
        if(c.square_notation.row === 1 || c.square_notation.row === 8){
          attack_boards.push(
            new attack_board(c, true, c.board, true),
            new attack_board(c, false, 'n', false),
          )
        }
        else {
          attack_boards.push(
            new attack_board(c, true, 'n', false),
            new attack_board(c, false, 'n', false),
          )
        }
      }
    )
  }
)

// axis helper
const axesHelper = new THREE.AxesHelper(5);
axesHelper.name = 'axis_helper'
scene.add( axesHelper );

// raycasting

const raycaster = new THREE.Raycaster()

function selector(event){
  const coords = new THREE.Vector2(
    (event.clientX / renderer.domElement.clientWidth) * 2 - 1,
    - ((event.clientY / renderer.domElement.clientHeight) * 2 -1),
  )
  raycaster.setFromCamera(coords,camera)
  const intersections = raycaster.intersectObjects(scene.children, true)
  // remember to exclude pieces later
  
  if(intersections.length>0){
    console.log(intersections[0].object.name)
  }
}

document.addEventListener('mousedown',selector)

export {
  scene,
}