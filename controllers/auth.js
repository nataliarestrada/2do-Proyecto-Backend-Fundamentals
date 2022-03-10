const User = require("../models/Usuarios")

class AuthController{
    getLoginView(req,res){
        return res.render("login")
    }

    getSignUpView(req,res){
        return res.render("registro")
    }

    async signUp(req,res){
     
        const newUser = new User(req.body)
        const validation = newUser.validate()
        console.log(validation)
        if(validation.sucess){
            await newUser.save()
            return res.redirect("/")
        }
        
        return res.render("registro",{validation,usuario:newUser})
    }
}

module.exports = AuthController