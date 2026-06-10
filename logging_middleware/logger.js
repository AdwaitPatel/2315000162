const axios = require("axios");

async function Log(
	stack,
	level,
	packageName,
	message
) {
	try {
		await axios.post(
			LOG_URL,
			{
				stack,
				level,
				package: packageName,
				message
			}
		);

	} catch (err) {
		console.error(err);
	}
}

module.exports = Log;