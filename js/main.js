var cc;
var c;

var score1 = 0;
var score2 = 0;

var ball_object;
var player1;
var player2;

hit = false;

window.onload=function() {
	c = document.getElementById('gc');
	cc = c.getContext('2d');

	ball_object = new Ball(c);

	var player1_ai_controlled = false;
	player1 = new Player(c, true, player1_ai_controlled, ball_object);

	var player2_ai_controlled = true;
	player2 = new Player(c, false, c.width - 10, player2_ai_controlled, ball_object);

	setInterval(update, 1000/30);
	c.addEventListener('mousemove', function(event) {
		player1.y_position = event.clientY - player1.height / 2; 
	});

	music_player.sound_on(false);
}

function reset_game() {
	console.log("Reset!");
	ball_object.reset();
	player1.reset();
	player2.reset();
}

function update() {

	ball_object.update(player1, player2);
	player1.update(ball_object);
	player2.update(ball_object);

	draw();
}

function draw() {

	cc.fillStyle = 'black';
	cc.fillRect(0, 0, c.width, c.height);

	ball_object.draw();
	player1.draw();
	player2.draw();
	
	cc.font = "30px Arial";
	cc.fillText(score1, 100, 100);
	cc.fillText(score2, c.width - 100, 100);
}

