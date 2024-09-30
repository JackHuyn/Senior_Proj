extends Area3D

@export var boardManager: GameManager
@export var boardPos: String

# Called when the node enters the scene tree for the first time.
func _ready() -> void:
	pass # Replace with function body.


# Called every frame. 'delta' is the elapsed time since the previous frame.
func _process(delta: float) -> void:
	pass


func _on_mouse_entered() -> void:
	print(boardPos + " is being hovered")
	if boardManager:
		boardManager.activeSquareChanged(boardPos)
