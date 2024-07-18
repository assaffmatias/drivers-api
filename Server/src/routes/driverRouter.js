const {Router} = require('express');
const {validationName} = require('../validations/validate')

const driverRouter = Router();

const {createDriverHandler, getDriversHandler, getDriverIdHandler, deleteDriver} = require('../handlers/driverHandler');

driverRouter.post('/', validationName, createDriverHandler)

driverRouter.get('/', getDriversHandler)

driverRouter.get('/:id', getDriverIdHandler)

driverRouter.delete('/:id', deleteDriver)

module.exports = driverRouter;