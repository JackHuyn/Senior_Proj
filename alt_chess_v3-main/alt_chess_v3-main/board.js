import * as THREE from 'three'
import { blackSquareMaterial, squareGeometry, whiteSquareMaterial } from './global'
import { square } from './square'

class board{
  constructor(translate){
    this.squareList = []
    this.squares = new THREE.Group()

    for(let col = 0, isStartLight = false; col < 8; col++, isStartLight = !isStartLight){
      let column = String.fromCharCode(col+97)
      let obj
      for(let r = 0, is_light = isStartLight; r<8; r++, is_light = !is_light){
        let row = r+1
        is_light ?
          obj = new THREE.Mesh(squareGeometry,whiteSquareMaterial)
          :
          obj = new THREE.Mesh(squareGeometry,blackSquareMaterial)
        const s = new square(column, row, is_light, obj, translate)
        this.squareList.push(s)
        this.squares.add(s.object)
      }
    }
  }
}

export {
  board
}