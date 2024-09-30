import * as THREE from 'three'
import { board } from './board'
import { lights, translate } from './global'
import { camera, renderer } from './main'
import pieces from './pieces'
import { notation } from './square'

const scene = new THREE.Scene()

const game_state = {
  is_white_turn: true,
  selected_piece: null,
}

// Pieces
const b1_pieces = new pieces()

// ray caster
const raycaster = new THREE.Raycaster

const on_cast = (event)=>{
  const coords = new THREE.Vector2(
    (event.clientX / renderer.domElement.clientWidth) * 2 - 1,
    -((event.clientY / renderer.domElement.clientHeight) * 2 - 1)
  )
  raycaster.setFromCamera(coords, camera)

  const intersections = raycaster.intersectObjects(b1.squares.children, true)

  if(intersections.length>0){
    console.log(intersections[0].object.name)
    let [column, row] = intersections[0].object.name
    row = parseInt(row)
    const piece = b1_pieces.checkSquare(column,row)
    if(piece!==undefined){
      if(piece.is_light==game_state.is_white_turn){
        game_state.selected_piece=piece
        game_state.selected_piece.updateLegalMoves()
      }
      else if(game_state.selected_piece!==null){
        // if legal move
        if(
          game_state.selected_piece.legal_moves.some(
            (n)=>{
              return n.column===column && n.row==row
            }
          )
        ){
          // remove the piece from the board
          b1_pieces.removePiece(piece)
          // move piece to the clicked square
          game_state.selected_piece.move(new notation(column,row))
          game_state.is_white_turn = !game_state.is_white_turn
          game_state.selected_piece = null
        }
        // else unselect the piece
        else{
          game_state.selected_piece = null
        }
      }
    }
    else if(game_state.selected_piece!==null){
      // if legal move
      if(
        game_state.selected_piece.legal_moves.some(
          (n)=>{
            return n.column===column && n.row==row
          }
        )
      ){
        // move the piece to the square
        game_state.selected_piece.move(new notation(column,row))
        game_state.is_white_turn = !game_state.is_white_turn
        game_state.selected_piece = null
      }
      // else unselect the piece
      else{
        game_state.selected_piece = null
      }
    }
  }
}

document.addEventListener('mousedown',on_cast)

// lights
scene.add(lights)

// custom geometry (stars)
const starsGemoetry = new THREE.BufferGeometry()
const starCount = 1400

const starPositions = new Float32Array(starCount * 3)

const starsGemoetryRadius = 70

for(let i = 0; i < starCount*3; i+=3){
  const u = Math.random()
  const v = Math.random()
  const theta = 2 * Math.PI * u
  const phi = Math.acos(2*v-1)
  starPositions[i] = starsGemoetryRadius * Math.sin(phi) * Math.cos(theta)
  starPositions[i+1] = starsGemoetryRadius * Math.sin(phi) * Math.sin(theta)
  starPositions[i+2] = starsGemoetryRadius * Math.cos(phi)
}

starsGemoetry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3))

const starsMaterial = new THREE.PointsMaterial()
starsMaterial.size = 0.2
starsMaterial.sizeAttenuation = true

const stars = new THREE.Points(starsGemoetry,starsMaterial)
stars.name = "stars"
scene.add(stars)

// board
const b1 = new board(translate)
scene.add(b1.squares)

// adding pieces to the scene
scene.add(b1_pieces.objects)

export {
  scene,
  b1,
  b1_pieces
}