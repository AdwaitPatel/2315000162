const axios = require("axios");

const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJhZHdhaXQucGF0ZWxfY3MyM0BnbGEuYWMuaW4iLCJleHAiOjE3ODEwODAyMDgsImlhdCI6MTc4MTA3OTMwOCwiaXNzIjoiQWZmb3JkIE1lZGljYWwgVGVjaG5vbG9naWVzIFByaXZhdGUgTGltaXRlZCIsImp0aSI6IjA3NWVkYzhkLTQ2ZTItNGQ1NC1hYjk2LWVkNmI5ZmQ3ZjMyZSIsImxvY2FsZSI6ImVuLUlOIiwibmFtZSI6ImFkd2FpdCBwYXRlbCIsInN1YiI6IjY0MTY5ODM0LTE0Y2YtNDhlYS1hMzQzLThmNDhhMzlkM2JkNiJ9LCJlbWFpbCI6ImFkd2FpdC5wYXRlbF9jczIzQGdsYS5hYy5pbiIsIm5hbWUiOiJhZHdhaXQgcGF0ZWwiLCJyb2xsTm8iOiIyMzE1MDAwMTYyIiwiYWNjZXNzQ29kZSI6IlJQc2dZdCIsImNsaWVudElEIjoiNjQxNjk4MzQtMTRjZi00OGVhLWEzNDMtOGY0OGEzOWQzYmQ2IiwiY2xpZW50U2VjcmV0IjoiTk1YUXVibld6VVZrbWtGbiJ9.NIezSKst9pu0xNtHjWRJlWP8ouZ73R1PPHCDHcHflG8";

const API_URL = "http://4.224.186.213/evaluation-service/notifications";

const weights = {
	Placement: 3,
	Result: 2,
	Event: 1,
};

async function getTopNotifications() {
	try {
		const response = await axios.get(API_URL, {
			headers: {
				Authorization: `Bearer ${TOKEN}`,
			},
		});

		const notifications = response.data.notifications;

		const ranked = notifications.map((notification) => {
			const ageHours =
				(Date.now() -
					new Date(notification.Timestamp).getTime()) /
				(1000 * 60 * 60);

			const recencyScore = Math.max(0, 100 - ageHours);

			const score =
				(weights[notification.Type] || 0) * 1000 +
				recencyScore;

			return {
				...notification,
				score,
			};
		});

		ranked.sort((a, b) => b.score - a.score);

		const top10 = ranked.slice(0, 10);

		console.table(
			top10.map((n) => ({
				Type: n.Type,
				Message: n.Message,
				Timestamp: n.Timestamp,
				Score: n.score.toFixed(2),
			}))
		);
	} catch (error) {
		console.error(error.message);
	}
}

getTopNotifications();