import * as THREE from 'three'
import piece from '../piece'
import { darkPieceMaterial, lightPieceMaterial, pawnGeometry } from '../global'
import { notation } from '../square'
import { b1_pieces } from '../chess_experiance'

class pawn extends piece{
  constructor(is_light, start_square){
    super(
      is_light,
      start_square,
      new THREE.Mesh(
        pawnGeometry,
        is_light ? lightPieceMaterial : darkPieceMaterial
      )
    )
    this.type = 'p_'+start_square.column+is_light ? '_white' : '_black'
    this.object.name = this.type
    this.legal_moves = []
  }
  getLegalMoves(){
    const {column, row} = this.current_square
    const currentColCharCode = column.charCodeAt(0)
    const direction = this.is_light ? 1 : -1
    const squares = []
    let p = b1_pieces.checkSquare(column, row+1*direction)
    let blocked = true
    if(p===undefined) {
      squares.push(new notation(column, row+1*direction))
      blocked = false
    }
    // first move
    if(this.move_count==0 && !blocked){
      p = b1_pieces.checkSquare(column,row+2*direction)
      if(p===undefined) squares.push(new notation(column,row+2*direction))
    }
    // captures
    p = b1_pieces.checkSquare(String.fromCharCode(currentColCharCode+1),row+1*direction)
    if(p!==undefined)
      squares.push(
        new notation(String.fromCharCode(currentColCharCode+1),row+1*direction)
      )
    p = b1_pieces.checkSquare(String.fromCharCode(currentColCharCode-1),row+1*direction)
    if(p!==undefined)
      squares.push(
        new notation(String.fromCharCode(currentColCharCode-1),row+1*direction)
      )
    // en passant
    return squares
  }
  updateLegalMoves(){
    this.legal_moves = this.getLegalMoves()
    console.log(this.legal_moves)
  }
}

export default pawn