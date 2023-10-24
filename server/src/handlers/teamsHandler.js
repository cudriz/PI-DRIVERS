const { getTeamsDriver } = require("../controllers/teamsControllers");

const getTeamsHandler = async (req, res) => {
  try {
    const teamsDrivers = await getTeamsDriver();
    res.status(200).json(teamsDrivers);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getTeamsHandler,
};
