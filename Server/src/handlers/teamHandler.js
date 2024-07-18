const {getAllTeams, createTeam} = require('../controllers/teamController');

const getTeamsHandler = async (req, res) => {
    try {
        const response = await getAllTeams();
        res.status(200).json(response);
    } catch (error) {
        res.status(400).json({error: error.message});
    };
};

const createTeamHandler = async (req, res) => {
    const {name} = req.body;
    
    try {
        const response = await createTeam(name);
        res.status(201).json(response);
    } catch (error) {
        res.status(400).json({error: error.message});
    };
};



module.exports = {getTeamsHandler, createTeamHandler};