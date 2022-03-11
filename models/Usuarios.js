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
        this.repetcontrasenia = user.repetcontrasenia
        
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
        this.idUsuario = newUser.id

        return newUser
    }

    async update(newUser){
        const id = await query("UPDATE usuario SET ? WHERE id=?" ,[newUser,this.idUsuario])
    }

    async delete(){
        await query("DELETE FROM usuario WHERE id=?",[this.idUsuario])
    }

    static async getByEmail(email){
        return await query("SELECT * FROM usuario WHERE email=?",[email])
    }

    validate(){
        let result = {success:true,errors:[]}
        if(!(this.username && this.nombre && this.edad && this.email && this.contrasenia && this.repetcontrasenia)){
            result.success = false
            result.errors.push("Rellena todos los campos")
        }
        if(this.contrasenia!==this.repetcontrasenia){
            result.success = false
            result.errors.push("Las contraseñas no coinciden")
        }

        return result
    }
}

module.exports = User