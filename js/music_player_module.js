var music_player = (function music_player(){

	console.log('Welcome to the music player');

	var appl = new Audio("sounds/applause.wav");
	var snd = [];

	for (var i = 0; i < 7; i++) {
		snd.push(new Audio("sounds/hit" + i + ".wav"));
	}

	function play(s) {

		console.log('play');

		if (!play_sound) {
			return;
		}

		if (s == 'hit') {
			console.log('hit called');
			snd[Math.floor(Math.random()*7)].play();
		} else if (s == 'applause') {
			appl.play()
			console.log('applause called');
		}
	}

	function sound_on(setting) {
		play_sound = setting;
	}

	return {
		play: play,
		sound_on: sound_on
	}

}());