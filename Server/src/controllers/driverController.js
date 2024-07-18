const { Driver, Team } = require('../db');
const axios = require('axios')
const { Op } = require('sequelize')

const cleanInfoAPI = (arr) => {
    return arr.map(driver => {
        return {
            id: driver.id,
            name: driver.name.forename,
            surname: driver.name.surname,
            description: driver.description,
            image: driver.image.url,
            nationality: driver.nationality,
            dob: driver.dob,
            teams: driver.teams,
            created: false,
        };
    });
};

const cleanInfoDB = (arr) => {
    return arr.map(driver => {
        const toString = driver.Teams.map((team) => team.name).join(', ')
        return {
            id: driver.id,
            name: driver.name,
            surname: driver.surname,
            description: driver.description,
            image: driver.image,
            nationality: driver.nationality,
            dob: driver.dob,
            teams: toString,
            created: driver.created
        }
    })
}

const createDriver = async (name, surname, description, image, nationality, dob, teams) => {

    const defaultImg = "https://www.formula1.com/etc/designs/fom-website/social/f1-default-share.jpg";
    const img = image ? image : defaultImg;

    const newDriver = await Driver.create({ name, surname, description, image: img, nationality, dob });
    newDriver.addTeam(teams)


    return newDriver;
};

const getAllDrivers = async () => {
    const getDriversDB = await Driver.findAll({
        include: [
            { model: Team, attributes: ["name"], through: {attributes: []} }
        ]
    });
    const driversDB = cleanInfoDB(getDriversDB)
    const { data } = await axios.get("http://localhost:5000/drivers/")
    const driversApi = cleanInfoAPI(data);

    return [...driversDB, ...driversApi];
};

const getDriverById = async (id, source) => {

    let driver;

    if (source === "api") {
        try {
            const { data } = await axios.get(`http://localhost:5000/drivers/${id}`)
            const driverFiltered = cleanInfoAPI([data])
            driver = driverFiltered

        } catch (error) {
            throw new Error(`No driver found with the API ID: ${id}`)
        }
    } else {
        const driverDB = await Driver.findByPk(id, {
            include: {
                model: Team,
                attributes: ["name"],
                through: {
                    attributes: []
                }
            },
        })
        const driverFilter = cleanInfoDB([driverDB])
        driver = driverFilter

        if (!driver) {
            throw new Error(`No driver found with the ID: ${id}`)
        }
    }

    return driver;

};

const getDriverByName = async (name) => {

    const lowerCase = name.toLowerCase();
    const { data } = await axios.get("http://localhost:5000/drivers/")
    const driversApi = cleanInfoAPI(data);
    const driverFilter = driversApi.filter(driver => driver.name.toLowerCase().includes(lowerCase));

    const getDriverDB = await Driver.findAll({ 
        where: { 
            name: { [Op.iLike]: '%' + name + '%' }
        },
       
        include: {
            model: Team,
            attributes: ["name"],
            through: {
                attributes: []
            }
        },
    });

    const driverDB = cleanInfoDB(getDriverDB)

    if (driverFilter.length === 0 && driverDB.length === 0) return null;

    return [...driverDB, ...driverFilter];
};

const deleteDriverDb = async (id) => {
    const driverDB = await Driver.destroy({
        where: {id: id}
    })
    return driverDB;
}

module.exports = {
    createDriver,
    getAllDrivers,
    getDriverById,
    getDriverByName,
    deleteDriverDb,
    
};

