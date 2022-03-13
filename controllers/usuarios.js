const User = require("../models/Usuarios")
/* const usuarioModelo = new Usuario() */

class UserController{

    async getUserView(req,res){
        const data = await User.readAll()
        /* console.log(data); */
        /* res.locals.username = req.session.username
        res.locals.idUsuario = req.session.idUsuario
        res.locals.loggedIn = true
        if(req.session.loggedIn){
            return res.render("usuarios",{
                idUsuario: req.session.idUsuario,
                loggedIn: true,
                username: req.session.username,
                usuarios:data,
                hasUsers:data.length > 0})
        } */
        return res.render("usuarios",{
            usuarios:data,
            hasUsers:data.length > 0})
        
    }
}

module.exports = UserController