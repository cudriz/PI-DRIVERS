const axios = require("axios");
const URL = "http://localhost:5000/drivers";
const { Driver, Team } = require("../db");
const { Op } = require("sequelize");


const infoCleaner = (array) => {
  return array.map((element) => {
    const teams = Array.isArray(element.teams)
      ? element.teams.join(", ") 
      : element.teams; 

    return {
      id: element.id,
      name: element.name.forename,
      surname: element.name.surname,
      description: element.description,
      image: element.image.url,
      nationality: element.nationality,
      dob: element.dob,
      teams: teams, 
      created: false,
    };
  });
};

const getDriverByName = async (name) => {
  const nameToLowerCase = name.toLowerCase();

  const driversDB = await Driver.findAll({
    where: {
      name: {
        [Op.iLike]: `%${nameToLowerCase}%`,
      },
    },
    limit: 15,
  });

  const driversApi = await axios.get(`${URL}`);
  const driverApiInfo = infoCleaner(driversApi.data);

  const filteredApiDrivers = driverApiInfo.filter((driver) => {
    return (
      driver.name.toLowerCase().includes(nameToLowerCase) ||
      driver.surname.toLowerCase().includes(nameToLowerCase)
    );
  });

  const combinedDrivers = [...driversDB, ...filteredApiDrivers];

  if (combinedDrivers.length === 0) {
    throw new Error("Driver not found");
  }

  return combinedDrivers.slice(0, 15);
};

const getAllDrivers = async () => {
  const driversDB = await Driver.findAll({
    include: {
      model: Team,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });
  const driverEstrucuturado = driversDB.map((driver)=>{
    return {
      id: driver.ID,
      name: driver.name,
      surname: driver.surname,
      description: driver.description,
      image: driver.image,
      nationality: driver.nationality,
      dob: driver.dob,
      teams: driver.Teams.map((team) => team.name).flat()
    }
  })

  const infoApi = (await axios.get(`${URL}`)).data;

  const driversApi = infoCleaner(infoApi);

  return [...driverEstrucuturado, ...driversApi];
};

const getIdPokemon = async (id, source) => {
  let driver;

  driver =
    source === "api"
      ? (await axios.get(`${URL}/${id}`)).data
      : await Driver.findByPk(id, {
        include: Team,  
      });
  return driver;
};

const createDriverDB = async (
  name,
  surname,
  description,
  image,
  nationality,
  dob,
  teams
) => {
  const newDriver = await Driver.create({
    name,
    surname,
    description,
    image,
    nationality,
    dob,
  });

  teams.forEach(async (teams) => {
    let teamsDb = await Team.findAll({
      where: {
        name: teams,
      },
    });
    await newDriver.addTeams(teamsDb);
  });  
  return newDriver;
};


module.exports = {
  getDriverByName,
  getAllDrivers,
  getIdPokemon,
  createDriverDB,
};
