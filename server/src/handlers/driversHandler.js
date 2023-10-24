const {
  getDriverByName,
  getAllDrivers,
  getIdPokemon,
  createDriverDB,
} = require("../controllers/driversControllers");

const getDriverHandler = async (req, res) => {
  try {
    const response = await getAllDrivers();
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const getDriverByNameHandler = async (req, res) => {
  const { name } = req.query;
  try {
    if (name) {
      const driverByName = await getDriverByName(name);
      res.status(200).json(driverByName);
    } else {
      res.status(400).json(`Conductor con el nombre ${name}, no existe.`);
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getDriverById = async (req, res) => {
  const { id } = req.params;
  const source = isNaN(id) ? "bdd" : "api";
  try {
    const response = await getIdPokemon(id, source);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const createDriver = async (req, res) => {
  const { name, surname, description, image, nationality, dob } = req.body;
  try {
    const newDriver = await createDriverDB(
      name,
      surname,
      description,
      image,
      nationality,
      dob
    );
    res.status(200).json(newDriver);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getDriverHandler,
  getDriverById,
  createDriver,
  getDriverByNameHandler,
};
