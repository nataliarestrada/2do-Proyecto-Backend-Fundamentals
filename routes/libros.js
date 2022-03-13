const express = require("express")
const BookController = require("../controllers/libros")

const router = express.Router()

const bookController = new BookController()

router.get("/libros",bookController.getBookView)
router.get("/mis_libros", bookController.getBookUserView)
router.get("/registro_libro", bookController.getSignUpView)
router.post("/registro_libro", bookController.signUp)
router.get("/editar_libro/:id", bookController.getUpdateBookView)
router.post("/editar_libro", bookController.updateBookView)
router.delete("/eliminar_libro/:id", bookController.deleteBookView)

module.exports = router