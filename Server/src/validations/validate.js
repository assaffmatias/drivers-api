const validationName = (req, res, next) => {
    const {name, surname, nationality, dob} = req.body;

    if(!name) return res.status(400).json({error: "Enter a name"})
    if(!surname) return res.status(400).json({error: "Enter a surname"})
    if(!nationality) return res.status(400).json({error: "Enter a nationality"})
    if(!dob) return res.status(400).json({error: "Enter a date of birth"})

    next();
}

module.exports = {
    validationName,
}