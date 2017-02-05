
var background = (function background() {

	var color = [18, 1, 88];
	var color_alfa = 0.9;
	var color_change = [5, 5, 5];
	var color_upper_cutoff = [75, 75, 150];
	var color_lower_cutoff = [50, 50, 50];
	var color_increase = [true, true, true];
	var background_update_speed = 5;
	var background_count = 0;

	function getColor() {

		background_count++;

		if (background_count >= background_update_speed) {

			background_count = 0;
			var random = Math.floor(Math.random() * 3); //which color component to change
			//if color_increase is true, increase the component, else decrease it
			color[random] += color_increase[random] ? color_change[random] : - color_change[random] 
			
			//if the color component has reached the upper cutoff, start decreasing, if it reached the lower cutoff, start increasing
			if (color[random] >= color_upper_cutoff[random] && color_increase[random]) { 
				color_increase[random] = false;
			} 
			else if (color[random] <= color_lower_cutoff[random] && ! color_increase[random]) {
				color_increase[random] = true;
			}			
		}

		return color;
	}

	function makeColorString(rgb_array) {
		return "rgba(" + rgb_array[0] + ", " + rgb_array[1] + ", " + rgb_array[2] + ", " + color_alfa + ")";
	}


	return {
		getColor: getColor,
		makeColorString: makeColorString
	}

}());