const express = require("express");
const app = express();

const { getDepots, getVehicles } = require("./services/apiService");

// routes import
const schedulerRouter = require("./routes/schedulerRoutes");

// middlewares
app.use(express.json());


app.get("/", async (req, res) => {
	try {
		const depots = await getVehicles();
		res.json(depots);
	} catch (error) {
		console.error(error.response?.data || error.message);
		res.status(500).json({
			error: "Failed",
		});
	}
});

app.use("/api", schedulerRouter);

app.listen(3000, () => {
	console.log("Server is running on http://localhost:3000")
})