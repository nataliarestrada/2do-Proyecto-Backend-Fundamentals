const Book = require("../models/Libros")

class BookController{

    // vista de todos los libros que el usuario puede alquilar (sus propios libros no figuran aqui)    
    async getBookView(req,res){
        const data = await Book.readAll(req.session.idUsuario)
        
        return res.render("libros",{
            libros:data,
            hasBook:data.length > 0,
            disponible:"DISPONIBLE"
        })
    }

    // buscar libro por el titulo (sus propios libros no figuran aqui)
    async getSearchBookView(req,res){
        const titulo = req.body
        // console.log(titulo)
        const data = await Book.buscarlibro(req.session.idUsuario,req.body.titulo)
        //console.log(data)
        return res.render("libros",{
            libros:data,
            hasBook:data.length > 0,
            disponible:"DISPONIBLE"
        })
    }

    //vista de los libros que registro el usuario
    async getBookUserView(req,res){
        const data = await Book.read(req.session.idUsuario)
        // console.log(data);
        return res.render("mis_libros",{ 
            libros:data,
            hasBook:data.length > 0})
    }

    //vista del registro de libros
    getSignUpView(req,res){
        return res.render("registro_libro")
    }

    //regista el libro 
    async signUp(req,res){

        const newBook = new Book(req.body)
        //console.log(newBook)
        const validation = newBook.validate()
        if(validation.success){
            await newBook.save()
            return res.redirect("/mis_libros")
        }
        return res.render("registro_libro",{validation,libro:newBook})

    }

    //elimino el libro
    async deleteBookView(req,res){
        const id = req.params.id
        await Book.delete(id)
    }

    //vista del formulario para editar libro(se muestan los datos del libro que quiere editar)
    async getUpdateBookView(req,res){
        const id = req.params.id
        const data = await Book.readUpdate(id)
        return res.render("editar_libro",{
            libro: data[0],
        })

    }

    //Edito el libro
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