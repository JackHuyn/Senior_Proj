import * as THREE from 'three'
import { assign_translate } from './board'
import { black_square_material, square_geometry, white_square_material } from './gloabal'
import { square } from './square'
import { scene } from './chess_experiance'

const loop_condition_helper = (val,dependent_val)=>{
  // this is to help with the for loop in the make_board function
  if(dependent_val){
    return val<2
  }
  return val>-2
}

class attack_board{
  constructor(corner_square, is_up, original_owner, active){
    this.square_list = []
    this.squares = new THREE.Group()
    this.corner_square = corner_square // this is a corner square from a fixed board
    this.original_owner = original_owner // w for white b for black n for not assigned
    const board_code = corner_square.board.toLowerCase().charCodeAt(0)
    this.translate = assign_translate(board_code)
    this.is_up = is_up
    this.make_board(
      this.corner_square.is_forward, 
      this.corner_square.is_right, 
      this.corner_square.is_light, 
    )
    this.active = active
    if(this.active){
      scene.add(this.squares)
    }
  }

  make_board(is_forward, is_right, parent_color){
    let f_factor = is_forward ? 1 : -1
    let r_factor = is_right ? 1 : -1
    let u_factor = this.is_up ? 1 : -1
    for(
      let col = 0, isStartLight = parent_color; 
      loop_condition_helper(col, is_right); 
      col += r_factor, isStartLight =! isStartLight
    ){
      let column = String.fromCharCode(this.corner_square.square_notation.column.charCodeAt(0) + col)
      let obj
      for(
        let r = 0, is_light = isStartLight; 
        loop_condition_helper(r, is_forward); 
        r+=f_factor, is_light = !is_light
      ){
        let temp_r = r + this.corner_square.square_notation.row
        is_light ?
          obj = new THREE.Mesh(square_geometry, white_square_material)
          :
          obj = new THREE.Mesh(square_geometry, black_square_material)
        const s = new square(column, temp_r, is_light, obj, this.translate)
        this.square_list.push(s)
        this.squares.add(s.object)
      }
    }
    this.squares.position.y += (u_factor * 1.5)
  }

  update_active(){
    this.active ?
      scene.remove(this.squares)
      :
      scene.add(this.squares)
    this.active = ! this.active
  }
}

export {
  attack_board
}