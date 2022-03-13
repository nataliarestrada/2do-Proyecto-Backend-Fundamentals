const express = require("express")
const RentaController = require("../controllers/renta")

const router = express.Router()

const rentaController = new RentaController()


router.get("/mis_rentas", rentaController.getRentaView)
router.get("/rentar_libro/:id", rentaController.getSignUpView)
router.post("/rentar_libro", rentaController.signUp)
/* router.get("/editar_libro/:id", bookController.getUpdateBookView)
router.post("/editar_libro", bookController.updateBookView)
router.delete("/eliminar_libro/:id", bookController.deleteBookView) */

module.exports = router