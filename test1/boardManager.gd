extends Node3D

class_name GameManager

var activeSquare

# Called when the node enters the scene tree for the first time.
func _ready() -> void:
	pass # Replace with function body.


# Called every frame. 'delta' is the elapsed time since the previous frame.
func _process(delta: float) -> void:
	pass 
	

func activeSquareChanged(newSquare):
	activeSquare = newSquare
	print("Active square changed to: ", newSquare)
