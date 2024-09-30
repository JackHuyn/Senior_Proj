extends CharacterBody3D

@export var speed = 3

# Emmit when the player jumped on the mob.
signal caught
var active = true

var target_velocity = Vector3.ZERO

func _ready():
	calc_velocity()
	$Timer.start()
	$"../Player".lose.connect(_on_player_lose)
	$"../UserInterface/ScoreLabel".win.connect(_on_score_label_win)

func _physics_process(_delta):
	if active:
		$Pivot.look_at(position + target_velocity, Vector3.UP)
		velocity = target_velocity
		move_and_slide()

func catch():
	caught.emit() # sends a signal that an enemy has been caught.
	queue_free()

func calc_velocity():
	var x = randf_range(-PI/4, PI/4)
	var z = randf_range(-PI/4, PI/4)
	target_velocity.x = x * speed
	target_velocity.z = z * speed

func _on_timer_timeout():
	calc_velocity()

func _on_score_label_win():
	active = false

func _on_player_lose():
	active = false
