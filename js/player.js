function Player(canvas, left_pos, ai_controlled, ball_object) {

	this.ai_controlled = ai_controlled;

	if (this.ai_controlled) {
		this.start_ai_speed = 6;
		this.ai_speed = this.start_ai_speed;
		this.ai_velocity_increase = 0.2;
	}

	this.canvas = canvas;
	this.canvas_context = canvas.getContext('2d');

	this.y_position = 40;

	this.width = 10;
	this.height = 100;

	if (left_pos) {
		this.x_position = 0;		
	}
	else {
		this.x_position = this.canvas.width - this.width;
	}
}


Player.prototype.reset = function() {

	if (this.ai_controlled) {
		this.ai_speed = this.start_ai_speed;
	}
}

Player.prototype.update = function(ball) {

	if (this.ai_controlled) {
		this.updateAI(ball);
	}
}

Player.prototype.updateAI = function(ball) {

	if (this.y_position + this.height / 2 < ball.y_position) {
		this.y_position += this.ai_speed;
	}
	else {
		this.y_position -= this.ai_speed;
	}

	this.ai_speed += this.ai_velocity_increase;
}


Player.prototype.draw = function() {

	this.canvas_context.fillStyle = 'white';
	this.canvas_context.fillRect(this.x_position, this.y_position + this.height / 2, this.width, this.height);
}