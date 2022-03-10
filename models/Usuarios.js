const {query, insert} = require("../config/database")

class User{
    idUsuario
    constructor(user){
        this.username = user.username
        this.nombre = user.nombre
        this.edad = user.edad
        this.email = user.email
        this.foto_perfil = user.foto_perfil
        this.contrasenia = user.contrasenia
        this.repetconstrasenia = user.repetconstrasenia
        
    }

    //El metodo puede ser utilizado sin crear una instancia
    static async readAll(){
        return await query("SELECT * FROM usuario")
    }

    async save(){
        const newUser = await insert("usuario",
        {
            username:this.username,
            nombre:this.nombre,
            edad:this.edad,
            email:this.email,
            foto_perfil:this.foto_perfil,
            contrasenia:this.contrasenia
        })
        this.idUsuario = newUser

        return this.idUsuario
    }

    async update(newUser){
        const id = await query("UPDATE usuario SET ? WHERE id=?" ,[newUser,this.idUsuario])
    }

    async delete(){
        await query("DELETE FROM usuario WHERE id=?",[this.idUsuario])
    }
}

module.exports = User