const { Router } = require("express");

const router = Router();
const mainRouter = require('./mainRouter');

router.use(mainRouter);

module.exports = router;
