const User = require("../models/Usuarios")

class AuthController{
    getLoginView(req,res){
        return res.render("login")
    }

    getSignUpView(req,res){
        return res.render("registro")
    }

    async signUp(req,res){
        // req.body:
        // {
        //     username:"tzuzulcode",
        //     firstName:"Tzuzul",
        //     ...
        // }

        const newUser = new User(req.body)
        console.log(newUser);
        await newUser.save()
        console.log(newUser);
        return res.redirect("/")
       /*  const validation = newUser.validate()
        console.log(validation)
        if(validation.sucess){
            await newUser.save()
            return res.redirect("/")
        }
        
        return res.render("registro",{validation,user:newUser}) */
    }
}

module.exports = AuthController