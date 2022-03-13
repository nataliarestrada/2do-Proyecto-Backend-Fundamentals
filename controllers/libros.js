const Book = require("../models/Libros")

class BookController{

    async getBookView(req,res){
        const data = await Book.readAll(req.session.idUsuario)
        /* console.log(data); */
        return res.render("libros",{
            libros:data,
            hasBook:data.length > 0,
            disponible:"DISPONIBLE"
        })
    }

    async getBookUserView(req,res){
        const data = await Book.read(req.session.idUsuario)
        /* console.log(data); */
        return res.render("mis_libros",{ 
            libros:data,
            hasBook:data.length > 0})
    }

    getSignUpView(req,res){
        return res.render("registro_libro")
    }

    async signUp(req,res){

        const newBook = new Book(req.body)
        const validation = newBook.validate()
        if(validation.success){
            await newBook.save()
            return res.redirect("/libros")
        }
        return res.render("registro_libro",{validation,libro:newBook})

    }

    async deleteBookView(req,res){
        const id = req.params.id
        await Book.delete(id)
    }

    async getUpdateBookView(req,res){
        const id = req.params.id
        const data = await Book.readUpdate(id)
        return res.render("editar_libro",{
            libro: data[0],
        })

    }

    async updateBookView(req,res){
        const newBook = new Book(req.body)
        newBook.id = req.body.id
        const validation = newBook.validate()
        if(validation.success){
            await Book.update(newBook)
            return res.redirect("/mis_libros")
        }
        
        return res.render("editar_libro",{
            validation, 
            libro:newBook})
    }
}

module.exports = BookController