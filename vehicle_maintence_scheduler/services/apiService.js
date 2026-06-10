const axios = require("axios");

const BASE_URL = "http://4.224.186.213/evaluation-service";

const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJhZHdhaXQucGF0ZWxfY3MyM0BnbGEuYWMuaW4iLCJleHAiOjE3ODEwNzYyNzYsImlhdCI6MTc4MTA3NTM3NiwiaXNzIjoiQWZmb3JkIE1lZGljYWwgVGVjaG5vbG9naWVzIFByaXZhdGUgTGltaXRlZCIsImp0aSI6IjhjMjcwN2M4LTY5ODAtNDhlOC1hNjdhLTlhNWEwY2M2NmJhMSIsImxvY2FsZSI6ImVuLUlOIiwibmFtZSI6ImFkd2FpdCBwYXRlbCIsInN1YiI6IjY0MTY5ODM0LTE0Y2YtNDhlYS1hMzQzLThmNDhhMzlkM2JkNiJ9LCJlbWFpbCI6ImFkd2FpdC5wYXRlbF9jczIzQGdsYS5hYy5pbiIsIm5hbWUiOiJhZHdhaXQgcGF0ZWwiLCJyb2xsTm8iOiIyMzE1MDAwMTYyIiwiYWNjZXNzQ29kZSI6IlJQc2dZdCIsImNsaWVudElEIjoiNjQxNjk4MzQtMTRjZi00OGVhLWEzNDMtOGY0OGEzOWQzYmQ2IiwiY2xpZW50U2VjcmV0IjoiTk1YUXVibld6VVZrbWtGbiJ9.bMaVx_V9t8jALYStjE8JRFq8kqrf1Ap8Fa9-pGL249E";

const api = axios.create({
	baseURL: BASE_URL,
	headers: {
		Authorization: `Bearer ${TOKEN}`,
	},
});

async function getDepots() {
	const response = await api.get("/depots");
	return response.data;
}

async function getVehicles() {
	const response = await api.get("/vehicles");
	return response.data;
}

module.exports = {
	getDepots,
	getVehicles,
};