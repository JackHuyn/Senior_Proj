
class notation{
  constructor(column, row){
    return {column, row}
  }
}

class square{
  constructor(column, row, is_light, object, translate){
    this.square_notation = new notation(column,row)
    this.is_light = is_light
    this.object = object
    const {x,z} = translate(column, row)
    this.object.position.x = x
    this.object.position.z = z
    this.object.name = column+row
  }
}

export {
  notation,
  square
}