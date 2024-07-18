const { createDriver, getAllDrivers, getDriverById, getDriverByName, deleteDriverDb } = require('../controllers/driverController')

const createDriverHandler = async (req, res) => {
    const { name, surname, description, image, nationality, dob, teams } = req.body;

    try {
        const response = await createDriver(name, surname, description, image, nationality, dob, teams);
        res.status(201).json(response);
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
};

const getDriversHandler = async (req, res) => {
    const { name } = req.query
    try {
        if (name) {
            const driverName = await getDriverByName(name)
            if (driverName) {
                const first15 = driverName.slice(0, 15);
                res.status(200).json(first15)
            } else {
                res.status(400).json({ error: `No named driver found: ${name}` })
            }
        }
        else {
            const response = await getAllDrivers();
            res.status(200).json(response);
        }
    } catch (error) {
        res.status(500).json({ error: error.message })
    };
};

const getDriverIdHandler = async (req, res) => {
    const { id } = req.params;

    const source = isNaN(id) ? "bdd" : "api";

    try {
        const response = await getDriverById(id, source);
        res.status(200).json(response);
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
};

const deleteDriver = async (req, res) => {
    const { id } = req.params;

    // const source = isNaN(id) ? "bdd" : "api";
    if (isNaN(id) === true) {
        try {
            const response = await deleteDriverDb(id);
            res.status(200).json(response);
        } catch (error) {
            res.status(400).send({ error: error.message })
        }
    } else{
        res.status(400).send(`No se puede eliminar drivers de la API`)
    }
}


module.exports = {
    createDriverHandler,
    getDriversHandler,
    getDriverIdHandler,
    deleteDriver,
};