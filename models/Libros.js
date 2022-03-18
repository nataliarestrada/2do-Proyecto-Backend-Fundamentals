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

    //El metodo puede ser utilizado sin crear una instancia
    static async readAll(id){
        return await query("SELECT * FROM libro WHERE id_usuario!=?",[id])
    }
    static async buscarlibro(id_usuario, titulo){
        return await query(`SELECT * FROM libro WHERE id_usuario!=? AND titulo LIKE "%` +titulo+ `%"`,[id_usuario])
    }

    static async read(id_usuario){
        return await query("SELECT * FROM libro WHERE id_usuario=?",[id_usuario])
    }

    static async readUpdate(id){
        return await query("SELECT * FROM libro WHERE id=?",[id])
    }


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

    static async update(newBook){
        return await query("UPDATE libro SET ? WHERE id=?" ,[newBook,newBook.id])
    }

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