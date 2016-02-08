### JSONP simple utility
```javascript
	jsonp({
		url: '//domain.tld/path',
		success: function (response) {
			console.log(response);
		},
		cbParamName: 'jsonp', // will be passed to server as callback='jsonp' URL-param
		cbName: 'globalJsonPVarName' // will be used as a prefix for callbacks naming in global scope
	});
```
