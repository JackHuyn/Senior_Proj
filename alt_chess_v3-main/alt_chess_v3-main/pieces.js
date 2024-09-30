import * as THREE from 'three'
import king from './pieces/king'
import pawn from './pieces/pawn'
import { notation } from './square'
import knight from './pieces/knight'
import bishop from './pieces/bishop'
import queen from './pieces/queen'
import rock from './pieces/rock'

class pieces{
  constructor(){
    this.pieceList = []
    this.objects = new THREE.Group()
    // kings
    const white_king = new king(true)
    const black_king = new king(false)
    this.pieceList.push(
      white_king,
      black_king,
    )
    // queens
    const white_queen = new queen(true, new notation('d',1),1)
    const black_queen = new queen(false, new notation('d',8),2)
    this.pieceList.push(
      white_queen,
      black_queen,
    )
    // pawns
    for (let i = 0; i < 8; i++) {
      const white_pawn = new pawn(true, new notation(String.fromCharCode(97+i),2))
      const black_pawn = new pawn(false, new notation(String.fromCharCode(97+i),7))
      this.pieceList.push(
        white_pawn,
        black_pawn,
      )
    }
    // knights
    const white_knight_b1 = new knight(true, new notation('b',1))
    const black_knight_b8 = new knight(false, new notation('b',8))
    const white_knight_g1 = new knight(true, new notation('g',1))
    const black_knight_g8 = new knight(false, new notation('g',8))
    this.pieceList.push(
      white_knight_b1, black_knight_b8,
      white_knight_g1, black_knight_g8,
    )
    // bishops
    const white_bishop_c1 = new bishop(true, new notation('c',1))
    const black_bishop_c8 = new bishop(false, new notation('c',8))
    const white_bishop_f1 = new bishop(true, new notation('f',1))
    const black_bishop_f8 = new bishop(false, new notation('f',8))
    this.pieceList.push(
      white_bishop_c1, black_bishop_c8,
      white_bishop_f1, black_bishop_f8,
    )
    // rocks
    const white_rock_a1 = new rock(true, new notation('a',1))
    const balck_rock_a8 = new rock(false, new notation('a',8))
    const white_rock_h1 = new rock(true, new notation('h',1))
    const balck_rock_h8 = new rock(false, new notation('h',8))
    this.pieceList.push(
      white_rock_a1, balck_rock_a8,
      white_rock_h1, balck_rock_h8,
    )
    // adding pieces to the group to be added to the main scene
    this.pieceList.forEach(p => {
      this.objects.add(p.object)
    })
    this.captured = []
  }
  checkSquare(col,row){
    let piece
    this.pieceList.forEach(
      (p) => {
        if(p.current_square.column===col && p.current_square.row==row){
          piece = p
        }
      }
    )
    return piece  
  }
  removePiece(piece){
    var i = this.pieceList.indexOf(piece)
    this.pieceList.splice(i,1)
    piece.object.removeFromParent()
    this.captured.push(piece)
  }
}

export default pieces