const {query, insert} = require("../config/database")

class Book{
    id
    constructor(book){
        this.titulo = book.titulo
        this.autor = book.autor
        this.portada = book.portada
        this.precio = book.precio
        this.estado = book.estado
        this.id_usuario = book.id_usuario
        
    }

    //devuelve todos los libros exepto los que son del usuario que se logeo
    static async readAll(id){

        //return await query("SELECT * FROM libro WHERE id_usuario!=?",[id])
        return await query("SELECT * FROM libro LEFT JOIN (SELECT id_libro, SUM(calificacion) / COUNT(id) as rating FROM renta WHERE calificacion IS NOT NULL GROUP BY id_libro) as table1 ON libro.id = table1.id_libro ORDER BY table1.rating DESC")
    }
    
    // static async rentaLibro(id){
    //     return await query("SELECT * FROM renta")
    // }

    //devuelve todoslos libros que tengan alguna coincidencia con lo que escribio el usuario(exepto sus libros)
    static async buscarlibro(id_usuario, titulo){
        return await query(`SELECT * FROM libro WHERE id_usuario!=? AND titulo LIKE "%` +titulo+ `%"`,[id_usuario])
    }


    //devuelve los libros del usuario
    static async read(id_usuario){
        return await query("SELECT * FROM libro WHERE id_usuario=?",[id_usuario])
    }

    //recupero los datos del libro que quiero editar
    static async readUpdate(id){
        return await query("SELECT * FROM libro WHERE id=?",[id])
    }

    // static async calificacion(){
    //     return await query("SELECT libro.id,libro.titulo,libro.autor,libro.portada,libro.precio,libro.estado,libro.id_usuario, (SUM(renta.calificacion) / COUNT(libro.id)) AS promedio FROM libro, renta WHERE renta.id_libro=libro.id AND renta.estado='INACTIVO'")
    // }

    //inserta el libro que registro el usuario
    async save(){
        const newBook = await insert("libro",
        {
            titulo:this.titulo,
            autor:this.autor,
            portada:this.portada,
            precio:this.precio,
            estado:this.estado,
            id_usuario:this.id_usuario
        })
        this.id = newBook.id

        return newBook
    }

    //edito el libro
    static async update(newBook){
        return await query("UPDATE libro SET ? WHERE id=?" ,[newBook,newBook.id])
    }

    //eliminar libro
    static async delete(id){
        return await query("DELETE FROM libro WHERE id=?",[id])
    }

    validate(){
        let result = {success:true,errors:[]}
        if(!(this.titulo && this.autor && this.portada && this.precio)){
            result.success = false
            result.errors.push("Rellena todos los campos")
        }

        return result
    }
}

module.exports = Book