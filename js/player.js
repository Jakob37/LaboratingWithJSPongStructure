function Player() {

	this.y_position = 40;
	this.x_position = 0;
	this.width = 10;
	this.height = 100;

}

Player.prototype.GetWidth = function() {
	return this.width;
}

Player.prototype.GetHeight = function() {
	return this.height;
}

