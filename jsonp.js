(function () {
	/**
	 * JSONP simple utility
	 * @param options
	 * - **`url`** - `{string}` - request's URL
	 * - **`success`** - `{function(<object>)}` - callback for response handling
	 * - **`cbParamName:`** - '{string}' - will be passed to server as callback='jsonp' URL-param
	 * - **`cbName:`** - '{string}' - will be used as a prefix for callbacks naming in global scope
	 *
	 */

	function JSONP (options) {
		var cbName = options && options.cbName || 'smjcb',
			callbackParamName = options.cbParamName || 'callback';
		if (!(cbName in JSONP)) {
			JSONP[cbName] = 0;
		}
		var script = document.createElement('script'),
			callback = '' + cbName + JSONP[cbName]++;

		function cleanup() {
			if (script && script.parentNode) { script.parentNode.removeChild(script); }
			if (callback in window) {
				try {
					delete window[callback];
				} catch (e) {
					window[callback] = undefined;  // IE8 support
				}
			}
		}

		window[callback] = function() {
			cleanup();
			if (options.success) {
				return options.success.apply(null, arguments);
			}
		};

		var appender = options.url.indexOf('?') == -1 ? '?' : '&';
		script.src = options.url + appender + callbackParamName + '=' + callback;
		script.async = true;
		script.onerror = function() {
			cleanup();
			if (options.error) { options.error.apply(null, arguments); }
		};

		(document.head || document.body).appendChild(script);
	}

	if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
		module.exports = JSONP;
	}
	else {
		if (typeof define === 'function' && define.amd) {
			define([], function() {
				return JSONP;
			});
		}
		else {
			window.JSONP = JSONP;
		}
	}

})();
