extends Node

func translate(col: String, row: int):
	var x = -('a'.ord() - col.to_lower()[0].ord() + 4)
	var y = row
	return Vector3(x,0,y)

# Called when the node enters the scene tree for the first time.
func _ready() -> void:
	pass # Replace with function body.


# Called every frame. 'delta' is the elapsed time since the previous frame.
func _process(delta: float) -> void:
	pass
