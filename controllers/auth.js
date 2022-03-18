const User = require("../models/Usuarios")

class AuthController{
    getLoginView(req,res){
        console.log(req.session);
        return res.render("login")
    }

    getSignUpView(req,res){
        return res.render("registro_usuario")
    }

    logOut(req,res){
        req.session.destroy()
        return res.redirect("/")
    }

    async logIn(req,res){
        const credenciales = req.body
        /* console.log(credenciales); */
        const userData=await User.getByEmail(credenciales.email)
        console.log(userData);
        if(userData.length === 0){
            return res.render("login",{ validation:{
                errors:["Usuario no registrado"]
            }})
        }
        if(userData[0].contrasenia!==credenciales.contrasenia){
            return res.render("login",{ validation:{
                errors:["Credenciales icorrectas"]
            }})
        }
         /*---------Session Info---------*/
        req.session.loggedIn = true
        req.session.idUsuario = userData[0].id
        req.session.username = userData[0].username
        req.session.foto_perfil = userData[0].foto_perfil
        return res.redirect("/libros")
       
    }

    async signUp(req,res){
     
        const newUser = new User(req.body)
        const validation = newUser.validate()
        console.log(validation)
        if(validation.success){
            await newUser.save()
            //console.log(await newUser.save())
            return res.redirect("/")
        }
        
        return res.render("registro_usuario",{validation,usuario:newUser})
    }
}

module.exports = AuthController