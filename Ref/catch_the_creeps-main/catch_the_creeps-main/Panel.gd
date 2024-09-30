extends Panel

signal end
var active = true

var time: float = 0.0
var minutes: int = 0
var seconds: int = 0
var msec: int = 0

var challengetime = 29

# Called when the node enters the scene tree for the first time.
func _ready():
	pass # Replace with function body.

# Called every frame. 'delta' is the elapsed time since the previous frame.
func _process(delta):
	if active:
		time += delta
		msec = fmod(time, 1)*100
		seconds = fmod(time, 60)
		minutes = fmod(time, 3600)/60
		$minutes.text = "%02d:" % minutes
		$seconds.text = "%02d." % seconds
		$miliSeconds.text = "%03d" % msec
	
	if seconds > challengetime:
		end.emit()
		active = false

func _on_score_label_win():
	active = false

func _on_player_lose():
	active = false
