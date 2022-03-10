const User = require("../models/Usuarios")
/* const usuarioModelo = new Usuario() */

class UserController{

    async getUserView(req,res){
        const data = await User.readAll()
        console.log(data);
        return res.render("home",{
            username:"Nati", 
            usuarios:data,
            hasUsers:data.length > 0})
    }
}



module.exports = UserController