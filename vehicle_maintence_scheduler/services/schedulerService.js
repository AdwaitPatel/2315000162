const { getDepots, getVehicles } = require("./apiService");
const solveKnapsack = require("../utils/knapsack");

const Log = require("../../logging_middleware/logger");

async function generateSchedules() {
  await Log(
    "backend",
    "info",
    "service",
    "Fetching depots and vehicles data"
  );

  const depotData = await getDepots();
  const vehicleData = await getVehicles();

  const depots = depotData.depots;
  const vehicles = vehicleData.vehicles;

  const schedules = [];

  for (const depot of depots) {
    await Log(
      "backend",
      "info",
      "service",
      `Processing depot ${depot.ID}`
    );

    const result = solveKnapsack(
      vehicles,
      depot.MechanicHours
    );

    schedules.push({
      depotId: depot.ID,
      mechanicHours: depot.MechanicHours,
      totalImpact: result.maxImpact,
      selectedTasks: result.selectedTasks
    });
  }

  await Log(
    "backend",
    "info",
    "service",
    "Schedule generation completed"
  );

  return schedules;
}

module.exports = {
  generateSchedules
};