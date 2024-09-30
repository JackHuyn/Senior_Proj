import * as THREE from 'three'
import piece from '../piece'
import { darkPieceMaterial, kingPieceGeometry, lightPieceMaterial } from '../global'
import { notation } from '../square'

class king extends piece{
  constructor(is_light){
    const s = is_light ? new notation('e',1) : new notation('e',8)
    super(
      is_light,
      s,
      new THREE.Mesh(
        kingPieceGeometry,
        is_light ? lightPieceMaterial : darkPieceMaterial
      )
    )
    this.type = 'K'
    this.object.name = this.type
    this.legal_moves = []
  }
  // Try not calling this function outside of the piece as much as possible
  // use updateLegalMoves instead
  getLegalMoves(){
    const {column,row} = this.current_square
    const columns = []
    const rows = []
    const currentColCharCode = column.charCodeAt(0)
    columns.push(
      String.fromCharCode(currentColCharCode-1),
      String.fromCharCode(currentColCharCode),
      String.fromCharCode(currentColCharCode+1),
    )
    rows.push(row, row+1, row-1)
    // some of the rows and columns will not make any sense but
    // since they cant be clicke on its fine
    const squares = []
    columns.forEach(
      (c)=>{
        rows.forEach(
          (r)=>{
            squares.push(new notation(c,r))
          }
        )
      }
    )
    return squares
  }
  updateLegalMoves(){
    this.legal_moves = this.getLegalMoves()
  }
}

export default king