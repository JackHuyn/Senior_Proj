import * as THREE from 'three'

// To translate a sqaure to a position use also in pieces
const translate = (col,row)=>{
  const col_code = col.toLowerCase().charCodeAt(0)
  let x = 0
  if(col_code == 'z'.charCodeAt(0)){
    x = -3
  }
  else{
    x = col.toLowerCase().charCodeAt(0)-'a'.charCodeAt(0)-2
  }
  let z = 2-row
  // to center it
  x += 0.5
  z -= 0.5
  return {x,z}
}

const square_geometry = new THREE.BoxGeometry(1, 0.2, 1)
square_geometry.name = "squareGeometry"
const white_square_material = new THREE.MeshStandardMaterial({ color: 0xffffff })
white_square_material.name = "whiteSquareMaterial"
const black_square_material = new THREE.MeshStandardMaterial({ color: 0x000000 })
black_square_material.name = "darkSquareNaterial"

export {
  translate,
  black_square_material,
  white_square_material,
  square_geometry,
}
