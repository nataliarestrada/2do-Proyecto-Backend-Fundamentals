const express = require("express")
const AuthController = require("../controllers/auth")


const router = express.Router()
const authController = new AuthController()

router.get("/login",authController.getLoginView)
router.get("/registro",authController.getSignUpView)
router.post("/registro",authController.signUp)

module.exports = router