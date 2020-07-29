exports.jsonWriter = function (message, statusCode, res) {
	if (!res) {
		var res = this.res;
	}
	let messageJSON = JSON.stringify(message);

	try {
		res.set('Connection', 'close');
		res.contentType('json');
	} catch (e) {
		console.log('Token -> JSONWRITER', e);
	}

	if (statusCode) {
		try {
			res.status(statusCode).end(messageJSON);
		} catch (e) {
			res.end(messageJSON);
		}
	} else {
		res.end(messageJSON);
	}

	message.data = [];
	message.error = 0;
};

exports.messageFactory = function () {
	return {
		code : 0,
		errorMessage : '',
		successMessage : '',
		data : null
	};
};

exports.throwError = function (code, errorMessage, statusCode, data, res) {
	let message = exports.messageFactory();
	message.code = code;
	message.errorMessage = errorMessage;
	message.data = data;
	exports.jsonWriter(message, statusCode, res);
};