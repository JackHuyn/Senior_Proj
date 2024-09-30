import * as THREE from 'three'

// To translate a sqaure to a position use also in pieces
const translate = (col,row)=>{
  const x = -('a'.charCodeAt(0) - col.toLowerCase().charCodeAt(0)+4)
  const z = -(row-4)
  return {x,z}
}

const squareGeometry = new THREE.BoxGeometry(1, 0.2, 1)
squareGeometry.name = "squareGeometry"
const whiteSquareMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff })
whiteSquareMaterial.name = "whiteSquareMaterial"
const blackSquareMaterial = new THREE.MeshStandardMaterial({ color: 0x000000 })
blackSquareMaterial.name = "darkSquareNaterial"


const kingPieceGeometry = new THREE.CapsuleGeometry(0.5,0.5,8,16)
const queenPieceGeometry = new THREE.TorusKnotGeometry(0.3,0.08,64,32,2,3)
const knightPieceGeometry = new THREE.DodecahedronGeometry(0.5,0)
const rockPieceGeometry = new THREE.BoxGeometry(0.64,0.64,0.64,1,1,1)
const bishopPieceGeometry = new THREE.OctahedronGeometry(0.5,0)
const pawnGeometry = new THREE.SphereGeometry(0.3,32,32)

const lightPieceMaterial = new THREE.MeshStandardMaterial({color:0xff8e00})
const darkPieceMaterial = new THREE.MeshStandardMaterial({color:0x003366})

const lights = new THREE.Group()

const ambientLight = new THREE.AmbientLight()
ambientLight.name = "amb_light"
const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
directionalLight.name = "dir_light"
directionalLight.position.y = 2

lights.add(ambientLight,directionalLight)

export {
  translate,
  squareGeometry,
  whiteSquareMaterial,
  blackSquareMaterial,
  kingPieceGeometry,
  queenPieceGeometry,
  knightPieceGeometry,
  rockPieceGeometry,
  bishopPieceGeometry,
  pawnGeometry,
  lightPieceMaterial,
  darkPieceMaterial,
  lights,
}