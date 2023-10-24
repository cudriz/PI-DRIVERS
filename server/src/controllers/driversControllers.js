const axios = require("axios");
const URL = "http://localhost:5000/drivers";
const { Driver, Team } = require("../db");
const { Op } = require("sequelize");

const infoCleaner = (array) => {
  return array.map((element) => {
    return {
      id: element.id,
      name: element.name.forename,
      surname: element.name.surname,
      description: element.description,
      image: element.image.url,
      nationality: element.nationality,
      dob: element.dob,
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
  const driversDB = await Driver.findAll();

  const infoApi = (await axios.get(`${URL}`)).data;

  const driversApi = infoCleaner(infoApi);

  return [...driversDB, ...driversApi];
};

const getIdPokemon = async (id, source) => {
  let driver;

  driver =
    source === "api"
      ? (await axios.get(`${URL}/${id}`)).data
      : await Driver.findByPk(id);
  return infoCleaner([driver]);
};

const createDriverDB = async (
  name,
  surname,
  description,
  image,
  nationality,
  dob
) => {
  const Driverr = await Driver.create({
    name,
    surname,
    description,
    image,
    nationality,
    dob,
  });
  return Driverr;
};

module.exports = {
  getDriverByName,
  getAllDrivers,
  getIdPokemon,
  createDriverDB,
};
