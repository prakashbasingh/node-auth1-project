const bcryptjs = require("bcryptjs");
const router = require("express").Router();

const Users = require("../users/users-model.js")

router.post("/register", (req, res) => {
    const credentials = req.body

    const rounds = process.env.HASH_ROUNDS || 8;

    const hash = bcryptjs.hashSync(credentials.password, rounds)

    credentials.password = hash;

    Users.add(credentials)
        .then(saved => {
            res.status(201).json({data: saved})
        })
        .catch(error => {
            res.status(500).json({ error: error.message})
        })
})

module.exports = router