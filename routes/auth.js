const express = require("express")
const AuthController = require("../controllers/auth")


const router = express.Router()
const authController = new AuthController()

router.get("/",authController.getLoginView)
router.post("/login",authController.logIn)
router.get("/registro_usuario",authController.getSignUpView)
router.post("/registro_usuario",authController.signUp)
router.get("/cerrar_sesion", authController.logOut)

module.exports = router