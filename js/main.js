var cc;
var c;

// Player attributes
var player1_y = 40;
var player2_y = 40;
var player_width = 10;
var player_height = 100;

// Ball attributes
var ball_x = 50;
var ball_y = 50;
var ball_diameter = 5;

var start_x_velocity = 4;
var start_y_velocity = 4;
var velocity_increase = 0.02;
var x_velocity = start_x_velocity;
var y_velocity = start_y_velocity;

// Game attributes
var score1 = 0;
var score2 = 0;

// AI attributes
var start_ai_speed = 6;
var ai_speed = start_ai_speed;

window.onload=function() {
	c = document.getElementById('gc');
	cc = c.getContext('2d');
	setInterval(update, 1000/30);

	c.addEventListener('mousemove', function(event) {
		player1_y = event.clientY - player_height / 2;
	});
}

function reset() {
	console.log("Reset!");
	ball_x = c.width / 2;
	ball_y = c.height / 2;
	x_velocity = start_x_velocity;
	y_velocity = start_y_velocity;
	ai_speed = start_ai_speed;
}

function update() {
	if (x_velocity > 0) {
		x_velocity +=  velocity_increase;
	} else {
		x_velocity -=  velocity_increase;
	}
	if (y_velocity > 0) {
		y_velocity +=  velocity_increase;
	} else {
		y_velocity -=  velocity_increase;
	}
	ai_speed += velocity_increase/2;
	ball_x += x_velocity;
	ball_y += y_velocity;
	controlEdgeCollisions();
	updateAI();
	draw();
}

function controlEdgeCollisions() {
	if (ball_y < 0 && y_velocity < 0) {
		y_velocity = -y_velocity;
	}
	else if (ball_y > c.height - ball_diameter && y_velocity > 0) {
		y_velocity = -y_velocity;
	}
	if (ball_x < 0) {
		if (ball_y > player1_y && ball_y < player1_y + player_height) {
			x_velocity = -x_velocity;
			play('hit');
			var delta_y = ball_y - (player1_y + player_height / 2);
			y_velocity = delta_y * 0.3;
		}
		else {
			score2++;
			play('applause');
			reset();
		}
	}
	else if (ball_x > c.width - ball_diameter) {
		if (ball_y > player2_y && ball_y < player2_y + player_height) {
			x_velocity = -x_velocity;
			play('hit');
			var delta_y = ball_y - (player2_y + player_height / 2);
			y_velocity = delta_y * 0.3;
		}
		else {
			score1++;
			play('applause');
			reset();
		}
	}
}

function updateAI() {
	if (player2_y + player_height / 2 < ball_y) {
		player2_y += ai_speed;
	}
	else {
		player2_y -= ai_speed;
	}
}

function draw() {
	cc.fillStyle = 'black';
	cc.fillRect(0, 0, c.width, c.height);
	
	cc.fillStyle = 'white';
	cc.fillRect(0, player1_y, player_width, player_height);
	cc.fillRect(c.width - player_width, player2_y, player_width, player_height);
	cc.fillRect(ball_x, ball_y, ball_diameter, ball_diameter);
	cc.font = "30px Arial";
	cc.fillText(score1, 100, 100);
	cc.fillText(score2, c.width - 100, 100);
}

var appl = new Audio("sounds/applause.wav");
var snd = [];

for (var i = 0; i < 7; i++) {
	snd.push(new Audio("sounds/hit" + i + ".wav"));
}

function play(s) {
	if (s == 'hit') {
		snd[Math.floor(Math.random()*7)].play();
	} else if (s == 'applause') {
		appl.play()
	}
}
