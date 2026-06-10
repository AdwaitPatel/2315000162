const axios = require("axios");

const LOG_URL = "http://4.224.186.213/evaluation-service/logs";
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJhZHdhaXQucGF0ZWxfY3MyM0BnbGEuYWMuaW4iLCJleHAiOjE3ODEwNzc2ODAsImlhdCI6MTc4MTA3Njc4MCwiaXNzIjoiQWZmb3JkIE1lZGljYWwgVGVjaG5vbG9naWVzIFByaXZhdGUgTGltaXRlZCIsImp0aSI6ImVmMzI0OWVmLTNkZTYtNDI1OS1hYzU1LWRlMWNhMGI0OTAzMSIsImxvY2FsZSI6ImVuLUlOIiwibmFtZSI6ImFkd2FpdCBwYXRlbCIsInN1YiI6IjY0MTY5ODM0LTE0Y2YtNDhlYS1hMzQzLThmNDhhMzlkM2JkNiJ9LCJlbWFpbCI6ImFkd2FpdC5wYXRlbF9jczIzQGdsYS5hYy5pbiIsIm5hbWUiOiJhZHdhaXQgcGF0ZWwiLCJyb2xsTm8iOiIyMzE1MDAwMTYyIiwiYWNjZXNzQ29kZSI6IlJQc2dZdCIsImNsaWVudElEIjoiNjQxNjk4MzQtMTRjZi00OGVhLWEzNDMtOGY0OGEzOWQzYmQ2IiwiY2xpZW50U2VjcmV0IjoiTk1YUXVibld6VVZrbWtGbiJ9.0zW6-JO_nCEBpPZbPycoeNQwwz7xi6tDmmFvdZua7Yo";


async function Log(stack, level, packageName, message) {
	try {
		const response = await axios.post(
			LOG_URL,
			{
				stack,
				level,
				package: packageName,
				message,
			},
			{
				headers: {
					Authorization: `Bearer ${TOKEN}`,
					"Content-Type": "application/json",
				},
			}
		);

		return response.data;
	} catch (error) {
		return {
			success: false,
			error:
				error.response?.data ||
				error.message ||
				"Logging failed",
		};
	}
}

module.exports = Log;