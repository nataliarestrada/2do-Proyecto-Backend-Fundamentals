const {query, insert} = require("../config/database")

class Renta{
    id
    constructor(renta){
        this.id_usuario = renta.id_usuario
        this.id_libro = renta.id_libro
        this.fecha_inicio = renta.fecha_inicio
        this.fecha_fin = renta.fecha_fin
        this.estado = renta.estado
        this.calificacion = renta.calificacion
    }

    //recupero las rentas del usuario y la info del libro que rento (se muestran primero los libros que aun no devolvio= renta activa)
    static async readAll(id){
        //return await query("SELECT * FROM renta WHERE id_usuario=?",[id])
        return await query("SELECT renta.id, renta.id_usuario, renta.id_libro, renta.fecha_inicio, renta.fecha_fin, renta.estado, libro.titulo, libro.portada, libro.precio FROM renta, usuario, libro WHERE renta.id_usuario = usuario.id and renta.id_libro = libro.id AND usuario.id = ? ORDER BY renta.estado",[id])
    }

    //recupero la info de la renta y del libro
    static async getRentaReview(id){
        return await query("SELECT renta.id, renta.id_usuario, renta.id_libro, renta.fecha_inicio, renta.fecha_fin, renta.estado, libro.titulo, libro.portada, libro.precio FROM renta, usuario, libro WHERE renta.id_usuario = usuario.id and renta.id_libro = libro.id AND renta.id = ?",[id])
    }

    //registro la renta
    async save(){
        const newRenta = await insert("renta",
        {
            id_usuario:this.id_usuario,
            id_libro:this.id_libro,
            fecha_inicio:this.fecha_inicio,
            fecha_fin:this.fecha_fin,
            estado:this.estado
           
        })
        this.id = newRenta.id

        return newRenta
    }

    //actualizo el estado del libro a rentado
    async actualizarLibro(id){
        return await query("UPDATE libro SET estado='RENTADO' WHERE id=?" ,[id])
    }

    // static async devolver(id){
    //     await query("UPDATE renta SET estado='INACTIVO' WHERE id=?" ,[id])
    // }

    //recupero la informacion del libro
    static async getIdLibro(id){
        return await query("SELECT * FROM renta WHERE id=?",[id])
    }

    //actializo el estado del libro a disponible
    static async actualizarLibroEstado(id){
        return await query("UPDATE libro SET estado='DISPONIBLE' WHERE id=?" ,[id])
    }

    //cambio el estado de la renta y registro la calificacion
    static async devolverCalificarLibro(id,calificacion){
        return await query("UPDATE renta SET estado='INACTIVO', calificacion=? WHERE id=?" ,[calificacion,id])
    }


    validate(){
        let result = {success:true,errors:[]}
        if(!(this.fecha_inicio && this.fecha_fin)){
            result.success = false
            result.errors.push("Rellena todos los campos")
        }

        return result
    }
}
module.exports = Renta