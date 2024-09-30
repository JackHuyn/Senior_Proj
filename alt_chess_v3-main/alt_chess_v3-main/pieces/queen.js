import * as THREE from 'three'
import { darkPieceMaterial, lightPieceMaterial, queenPieceGeometry } from '../global'
import { rockMovement } from './rock'
import { bishopMovement } from './bishop'
import piece from '../piece'

class queen extends piece{
  constructor(is_light, start_square, queen_number){
    super(
      is_light,
      start_square,
      new THREE.Mesh(
        queenPieceGeometry,
        is_light ? lightPieceMaterial : darkPieceMaterial
      )
    )
    this.type = 'Q_'+queen_number
    this.object.name = this.type
    this.legal_moves = []
  }
  getLegalMoves(){
    const {column, row} = this.current_square
    const currentColCharCode = column.charCodeAt(0)
    const squares = []
    rockMovement(currentColCharCode, row, squares)
    bishopMovement(currentColCharCode, row, squares)
    return squares
  }
  updateLegalMoves(){
    this.legal_moves = this.getLegalMoves()
  }
}

export default queen