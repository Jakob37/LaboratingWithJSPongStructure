
function Ball(canvas) {

	this.canvas = canvas;
	this.canvas_context = canvas.getContext('2d');

	console.log("Ball constructor called");

	this.start_x_velocity = 2;
	this.start_y_velocity = 2;

	this.x_position = 10;
	this.y_position = 10;
	this.diameter = 10;

	this.x_velocity = 0;
	this.y_velocity = 0;

	this.paddle_speed_angle = 0.3;
	this.velocity_increase = 0.2;

	this.reset();

	this.x_velocity = this.start_x_velocity;
	this.y_velocity = this.start_y_velocity;
}

Ball.prototype.reset = function() {

	this.x_velocity = this.start_x_velocity;
	this.y_velocity = this.start_y_velocity;

	this.x_position = this.canvas.width / 2;
	this.y_position = this.canvas.height / 2;
}

Ball.prototype.update = function(player1, player2) {

	this.x_position += this.x_velocity;
	this.y_position += this.y_velocity;

	this.increaseVelocity();

	this.controlEdgeCollisions(player1, player2);
}

Ball.prototype.increaseVelocity = function()  {
	if (this.x_velocity > 0) {
		this.x_velocity +=  this.velocity_increase;
	} else {
		this.x_velocity -=  this.velocity_increase;
	}
	if (this.y_velocity > 0) {
		this.y_velocity +=  this.velocity_increase;
	} else {
		this.y_velocity -=  this.velocity_increase;
	}
}

Ball.prototype.draw = function() {

	this.canvas_context.fillStyle = 'white';
	this.canvas_context.fillRect(this.x_position, this.y_position, this.diameter, this.diameter);
}

Ball.prototype.controlEdgeCollisions = function(player1, player2) {

	this.edgeBounce();
	this.playerCheck(player1, player2);
}

Ball.prototype.edgeBounce = function() {
	if (this.y_position < 0 && this.y_velocity < 0) {
		this.y_velocity = -this.y_velocity;
	}
	else if (this.y_position > c.height - this.diameter && this.y_velocity > 0) {
		this.y_velocity = -this.y_velocity;
	}	
}

Ball.prototype.playerCheck = function(player1, player2) {

	if (this.x_position < 0) {
		if (this.y_position > player1.y_position && this.y_position < player1.y_position + player1.height) {
			this.x_velocity = -this.x_velocity;
			music_player.play('hit');
			var delta_y = this.y_position - (player1.y_position + player1.height / 2);
			this.y_velocity = delta_y * this.paddle_speed_angle;
		}
		else {
			score2++;
			music_player.play('applause');
			reset_game();
		}
	}
	else if (this.x_position > this.canvas.width - this.diameter) {

		if (this.y_position > player2.y_position && this.y_position < player2.y_position + player2.height) {
			this.x_velocity = -this.x_velocity;
			music_player.play('hit');
			var delta_y = this.y_position - (player2.y_position + player2.height / 2);
			this.y_velocity = delta_y * this.paddle_speed_angle;
		}
		else {
			score1++;
			music_player.play('applause');
			reset_game();
		}
	}

}


