const {
 
  getCountrieById,
  getCountrieByName,
  getAllCountries,
  updateDatabaseWithApiCountries,

} = require("../controllers/contriesController");
let isDatabaseUpdated = false;

const actualizarDB = async () => {
  if (isDatabaseUpdated == false) {
    try {
      const response = await updateDatabaseWithApiCountries();
      isDatabaseUpdated = true;
      console.log("se actualizo la base  de datos" + isDatabaseUpdated);
    } catch (error) {
      console.log(
        "Ocurrió un error al actualizar la base de datos." + isDatabaseUpdated
      );
    }
  }
};
actualizarDB();

const getCountriesByName = async (req, res) => {
  const name = req.params.name;
  try {
    const response = await getCountrieByName(name);
    res.status(200).send(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getCountrieHandler = async (req, res) => {
  try {
    const response = await getAllCountries();
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getIdHandler = async (req, res) => {
  const id = req.params.id;
  try {
    const response = await getCountrieById(id);
    res.status(200).send(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


// /:id = params si modifica
// query === ? name&raza, no modifica la ruta

module.exports = {
  getCountrieHandler: getCountrieHandler,
  getIdHandler: getIdHandler,
  getCountriesByName: getCountriesByName,
  
};
