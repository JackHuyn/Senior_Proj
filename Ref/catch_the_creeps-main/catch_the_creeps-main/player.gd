extends CharacterBody3D

signal lose

var active = true

# Speed of the player.
@export var speed = 14
# Ground acceleration.
@export var fall_acceleration = 75
# Vertial jump impuls in meters per second.
@export var jump_impulse = 20
# how mush does it bounce after sqaushing a mob.
@export var bounce_impulse = 16

var target_velocity = Vector3.ZERO

func _physics_process(delta):
	var direction = Vector3.ZERO
	# Checking for input.
	if active:
		if Input.is_action_pressed("move_left"):
			direction.x -= 1
		if Input.is_action_pressed("move_right"):
			direction.x += 1
		if Input.is_action_pressed("move_back"):
			direction.z += 1
		if Input.is_action_pressed("move_forward"):
			direction.z -= 1
		if Input.is_action_just_pressed("jump"):
			target_velocity.y = jump_impulse
	
	# making the direction constant
	if direction != Vector3.ZERO:
		direction = direction.normalized()
		$Pivot.look_at(position + direction, Vector3.UP)
	
	target_velocity.x = direction.x * speed
	target_velocity.z = direction.z * speed
	
	if not is_on_floor():
		target_velocity.y = target_velocity.y - (fall_acceleration*delta)
	
	velocity = target_velocity
	move_and_slide()
	handle_collissions()

func handle_collissions():
	for index in range (get_slide_collision_count()):
		var collision = get_slide_collision(index)
		
		if collision.get_collider() == null:
			continue
		if collision.get_collider().is_in_group("mob"):
			var enemy = collision.get_collider()
			if Vector3.UP.dot(collision.get_normal())>0.1:
				$SquashSound.play()
				enemy.catch()
				target_velocity.y = bounce_impulse
			else:
				die()
			break # prevent further duplicate calls?

func die():
	lose.emit()
	active = false

func _on_panel_end():
	die()

func _on_score_label_win():
	active = false
