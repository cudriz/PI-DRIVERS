const axios = require("axios");

const { Team } = require("../db");

const getAllTeams = async () => {
  try {
    const teams = await Team.findAll({
      attributes: ["name"],
    });
    return teams.map((team) => team.name);
  } catch (error) {
    throw new Error(error.message);
  }
};

const saveTeams = async (teams) => {
  try {
    await Promise.all(
      teams.map(async (typeName) => {
        await Team.create({
          name: typeName,
        });
      })
    );
  } catch (error) {
    throw new Error(error.message);
  }
};

const getTeamsDriver = async () => {
  const teamsInDB = await getAllTeams();

  if (teamsInDB.length === 0) {
    const response = await axios.get("http://localhost:5000/drivers");

    if (response.status === 200) {
      const teams = response.data
        .filter((driver) => driver.teams) // Filtrar los conductores que tienen la propiedad 'teams'
        .map((driver) => driver.teams.split(", "))
        .flat();

      // Remove duplicates from the array of teams
      const uniqueTeams = [...new Set(teams)];

      await saveTeams(uniqueTeams);

      return uniqueTeams;
    } else {
      throw new Error("Error al obtener equipos desde la API");
    }
  } else {
    return teamsInDB;
  }
};
module.exports = {
  getTeamsDriver,
};
