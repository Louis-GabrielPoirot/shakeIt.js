window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

function shakeIt(wrapper, options) {
	function play () {
			
		var applyStyle = true,
			applyOnCompleted = false,
			defaults = {
				duration : 500,
				effect : "ease-in",
				oncompleted : function() {},
			};

		for (var i in options) {
			for (var j in defaults) {
				if(i === "oncompleted") {
					applyOnCompleted = true;
				}

				if(j === i) {
					defaults[j] = options[i];
					applyStyle = false;
				}
			}

			if(applyStyle){
				wrapper.style[i] = options[i].toString();
			}

			applyStyle = true;
		}

		wrapper.style.transition = "all " + (defaults.duration / 1000) + "s " + defaults.effect;
		wrapper.style.webkitTransition = "all " + (defaults.duration / 1000) + "s " + defaults.effect;

		setTimeout(function() {
			wrapper.style.transition = "none";
			wrapper.style.webkitTransition = "none";

			if(applyOnCompleted) {
				options.oncompleted();
			}
		}, defaults.duration);
	}
	
	requestAnimationFrame(play);
}
