const {query, insert} = require("../config/database")

class Renta{
    id
    constructor(renta){
        this.id_usuario = renta.id_usuario
        this.id_libro = renta.id_libro
        this.fecha_inicio = renta.fecha_inicio
        this.fecha_fin = renta.fecha_fin
        this.estado = renta.estado
    }

    //El metodo puede ser utilizado sin crear una instancia
    static async readAll(id){
        return await query("SELECT * FROM renta WHERE id_usuario=?",[id])
    }

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

    async actualizarLibro(id){
        return await query("UPDATE libro SET estado='RENTADO' WHERE id=?" ,[id])
    }

    static async devolver(id){
        await query("UPDATE renta SET estado='INACTIVO' WHERE id=?" ,[id])
    }

    static async getIdLibro(id){
        return await query("SELECT * FROM renta WHERE id=?",[id])
    }

    static async actualizarLibroEstado(id){
        return await query("UPDATE libro SET estado='DISPONIBLE' WHERE id=?" ,[id])
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