import * as THREE from 'three'
import { darkPieceMaterial, knightPieceGeometry, lightPieceMaterial } from '../global'
import { notation } from '../square'
import piece from '../piece'

class knight extends piece{
  constructor(is_light, start_square){
    super(
      is_light,
      start_square,
      new THREE.Mesh(
        knightPieceGeometry,
        is_light ? lightPieceMaterial : darkPieceMaterial
      )
    )
    this.type = 'N_'+start_square.column
    this.object.name = this.type
    this.legal_moves = []
  }
  getLegalMoves(){
    const {column,row} = this.current_square
    const currentColCharCode = column.charCodeAt(0)
    const squares = [
      new notation(
        String.fromCharCode(currentColCharCode+2),
        row+1
      ),
      new notation(
        String.fromCharCode(currentColCharCode+2),
        row-1
      ),
      new notation(
        String.fromCharCode(currentColCharCode-2),
        row+1
      ),
      new notation(
        String.fromCharCode(currentColCharCode-2),
        row-1
      ),
      new notation(
        String.fromCharCode(currentColCharCode+1),
        row+2
      ),
      new notation(
        String.fromCharCode(currentColCharCode-1),
        row+2
      ),
      new notation(
        String.fromCharCode(currentColCharCode+1),
        row-2
      ),
      new notation(
        String.fromCharCode(currentColCharCode-1),
        row-2
      ),
    ]
    return squares
  }
  updateLegalMoves(){
    this.legal_moves = this.getLegalMoves()
  }
}

export default knight