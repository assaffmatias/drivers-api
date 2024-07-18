const {Team, conn} = require('../db');
const axios = require('axios');

const getAllTeams = async () => {
    const teamsDB = await Team.findAll();
    const {data} = await axios.get("http://localhost:5000/drivers/");

    const uniqueTeams = new Set();
    
    data.forEach((driver) => {
        if (driver.teams) {
          const driverTeams = driver.teams.split(",").map((team) => team.trim());
          driverTeams.forEach((team) => uniqueTeams.add(team));
        }
      });

    const teamsAPI = Array.from(uniqueTeams);
    
    const teamsToSave = teamsAPI.filter((apiTeam) => {
        const teamExists = teamsDB.some((dbTeam) => dbTeam.name === apiTeam);
        return !teamExists;
    });

    const teamsAPIMap = teamsToSave.map((name, index) => ({
        id: teamsDB.length + index + 1,
        name: name,
      }));
    
    const combinedTeams = [...teamsDB, ...teamsAPIMap];

    if (teamsToSave.length > 0) {
        await conn.transaction(async (t) => {
          await Team.bulkCreate(teamsAPIMap, { transaction: t });
        });
      };

    return combinedTeams;
};  

const createTeam = async (name) => {
    return await Team.create({name});
};



module.exports = {getAllTeams, createTeam};