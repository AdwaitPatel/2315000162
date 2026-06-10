const { generateSchedules } = require("../services/schedulerService");

const Log = require("../../logging_middleware/logger");

async function getOptimalSchedule(req, res) {
	try {
		await Log(
			"backend",
			"info",
			"controller",
			"GET /schedule requested"
		);

		const schedules = await generateSchedules();

		res.status(200).json({
			success: true,
			schedules
		});
	} catch (error) {
		await Log(
			"backend",
			"error",
			"controller",
			error.message
		);

		res.status(500).json({
			success: false,
			message: error.message
		});
	}
}

module.exports = {
	getOptimalSchedule
};