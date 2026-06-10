const express = require("express");
const app = express();

// routes import
const schedulerRouter = require("./routes/schedulerRoutes");

// middlewares
app.use(express.json());

app.use("/api", schedulerRouter);

app.listen(3000, () => {
	console.log("Server is running on http://localhost:3000")
});