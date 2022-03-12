const express = require("express")
const UserController = require("../controllers/usuarios")

const router = express.Router()

const userController = new UserController()

router.get("/usuarios",userController.getUserView)

module.exports = router