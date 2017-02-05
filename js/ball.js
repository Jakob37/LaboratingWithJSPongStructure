
function Ball(c) {

	this.canvas = c.getContext('2d');


	console.log("Ball constructor called");

	this.start_x_velocity = 0;
	this.start_y_velocity = 0;

	this.x_position = 10;
	this.y_position = 10;
	this.diameter = 100;

	this.x_velocity = 0;
	this.y_velocity = 0;

	this.Reset();

	// this.x_velocity = this.start_x_velocity;
	// this.y_velocity = this.start_y_velocity;

}

Ball.prototype.Reset = function() {

	console.log("Ball reset called");

	this.x_velocity = this.start_x_velocity;
	this.y_velocity = this.start_y_velocity;

	this.x_position = this.canvas.width / 2;
	this.y_position = this.canvas.height / 2;
}

Ball.prototype.Update = function() {
	this.ControlEdgeCollisions();
}

Ball.prototype.Draw = function() {

	console.log("Ball draw");

	this.canvas.fillStyle = 'white';
	this.canvas.font = "30px Arial";
	this.canvas.fillText("A BALL EXPERIMENT", 200, 200);

	cc.font = "30px Arial";
	cc.fillText("A CC EXPERIMENT", 200, 300);


	// this.canvas.fillStyle = 'white';
	this.canvas.fillRect(this.x_position, this.y_position, this.diameter, this.diameter);
	this.canvas.fillRect(10, 10, 50, 50);

}

Ball.prototype.ControlEdgeCollisions = function() {

	if (this.y_position < 0 && this.y_velocity < 0) {
		this.y_velocity = -this.y_velocity;
	}
	else if (this.y_position > c.height - this.diameter && this.y_velocity > 0) {
		this.y_velocity = -this.y_velocity;
	}

	if (this.x_position < 0) {
		if (this.y_position > player1_y && this.y_position < player1_y + player_height) {
			this.x_velocity = -this.x_velocity;
			play('hit');
			var delta_y = this.y_position - (player1_y + player_height / 2);
			this.y_velocity = delta_y * 0.3;
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

