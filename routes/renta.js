const express = require("express")
const RentaController = require("../controllers/renta")

const router = express.Router()

const rentaController = new RentaController()


router.get("/mis_rentas", rentaController.getRentaView)
router.get("/rentar_libro/:id", rentaController.getSignUpView)
router.post("/rentar_libro", rentaController.signUp)
router.get("/return_libro/:id",rentaController.getReviewBookView)
router.post("/return_libro/",rentaController.returnBook)

module.exports = router