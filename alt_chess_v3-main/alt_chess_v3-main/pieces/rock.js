import * as THREE from 'three'
import piece from '../piece'
import { darkPieceMaterial, lightPieceMaterial, rockPieceGeometry } from '../global'
import { notation } from '../square'
import { b1_pieces } from '../chess_experiance'

const traverse = (max, is_vertical, direction, current_col_code, current_row, squares)=>{
  if(is_vertical){
    for (let i = 1; i < max; i++) {
      const s = new notation(
        String.fromCharCode(current_col_code+i*direction),
        current_row
      )
      const p = b1_pieces.checkSquare(s.column,s.row)
      if(p===undefined){
        squares.push(s)
      }
      else {
        squares.push(s)
        break
      }
    }
  }
  else{
    for (let i = 1; i < max; i++) {
      const s = new notation(
        String.fromCharCode(current_col_code),
        current_row+i*direction
      )
      const p = b1_pieces.checkSquare(s.column,s.row)
      if(p===undefined){
        squares.push(s)
      }
      else {
        squares.push(s)
        break
      }
    }
    squares.push(new notation(String.fromCharCode(current_col_code),current_row))
  }
}

const rockMovement = (current_col_code, row, squares)=>{
  traverse(8, false, -1, current_col_code, row, squares)
  traverse(8, false, 1, current_col_code, row, squares)
  traverse(8, true, -1, current_col_code, row, squares)
  traverse(8, true, 1, current_col_code, row, squares)
  // some of the squares are going to br giberish but I do not care
}

class rock extends piece{
  constructor(is_light, start_square){
    super(
      is_light,
      start_square,
      new THREE.Mesh(
        rockPieceGeometry,
        is_light ? lightPieceMaterial : darkPieceMaterial
      )
    )
    this.type = 'R_'+start_square.column
    this.object.name = this.type
    this.legal_moves = []
  }
  getLegalMoves(){
    const {column,row} = this.current_square
    const currentColCharCode = column.charCodeAt(0)
    const squares = []
    rockMovement(currentColCharCode, row, squares)
    return squares
  }
  updateLegalMoves(){
    this.legal_moves = this.getLegalMoves()
  }
}

export default rock
export { traverse, rockMovement }