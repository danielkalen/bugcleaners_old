function util(){
	
	// ==== Debounce =================================================================================

	/*Returns a function, that, as long as it continues to be invoked, will not
	be triggered. The function will be called after it stops being called for
	N milliseconds. If `immediate` is passed, trigger the function on the
	leading edge, instead of the trailing.*/
	this.debounce = function(func, wait, immediate) {
		var timeout;
		return function() {
			var context = this, args = arguments;
			var later = function() {
				timeout = null;
				if (!immediate) func.apply(context, args);
			};
			var callNow = immediate && !timeout;
			clearTimeout(timeout);
			timeout = setTimeout(later, wait);
			if (callNow) func.apply(context, args);
		};
	};
	/*
	Usage:
		var myEfficientFn = debounce(function() {
			// All the taxing stuff you do
		}, 250);
		window.addEventListener('resize', myEfficientFn);
	*/



	// ==== Once =================================================================================
	this.once = function(fn, context) { 
		var result;

		return function() { 
			if(fn) {
				result = fn.apply(context || this, arguments);
				fn = null;
			}

			return result;
		};
	}
	/*
	Usage
		var canOnlyFireOnce = once(function() {
			console.log('Fired!');
		});

		canOnlyFireOnce(); // "Fired!"
		canOnlyFireOnce(); // nada
	*/




	// ==== Add style tags =================================================================================
	this.sheet = (function() {
		// Create the <style> tag
		var style = document.createElement('style');

		// Add a media (and/or media query) here if you'd like!
		// style.setAttribute('media', 'screen')
		// style.setAttribute('media', 'only screen and (max-width : 1024px)')

		// WebKit hack :(
		style.appendChild(document.createTextNode(''));

		// Add the <style> element to the page
		document.head.appendChild(style);

		return style.sheet;
	})();
	/*
	Usage
		sheet.insertRule("header { float: left; opacity: 0.8; }", 1);
	*/








	// ==== Perf test =================================================================================


	this.perfTime = function(fn, milliSeconds) {
		var startTime = new Date().getTime(),
			endTime = 0,
			repeatFunction = true,
			i = 0;

		if (typeof milliSeconds == 'undefined') {
			var milliSeconds = 5000;
		}

		while ( repeatFunction ) {
			fn.apply(this, arguments);
			i++

			if (endTime - startTime < milliSeconds) {
				endTime = new Date().getTime();
			} else {
				console.log('Completed function ' + i + ' times');
				repeatFunction = false;
			}

		}

	}

	this.perf = function(fn, times) {
		var startTime = new Date().getTime();
		var i = 0;

		if (typeof times == 'undefined') {
			var times = 100000;
		}

		while (i < (times + 1)) {
			fn.apply(this, arguments);

			if (i === times) {
				var endTime = new Date().getTime(),
					finishTime = endTime - startTime;
				console.log(finishTime);
			}

			i++;
		}

	}


}



// ==== Log =================================================================================
function log() {
  try {
    console.log.apply( console, arguments );
  } catch(e) {
    try {
      opera.postError.apply( opera, arguments );
    } catch(e){
      alert( Array.prototype.join.call( arguments, " " ) );
    }
  }
}


function error(msg, alert) {
	throw Error(msg);

	if (alert) alert(msg);
}







