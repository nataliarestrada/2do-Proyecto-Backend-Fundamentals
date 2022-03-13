const Renta= require("../models/Renta")

class RentaController{

    async getRentaView(req,res){
        const data = await Renta.readAll(req.session.idUsuario)
        /* console.log(data); */
        return res.render("mis_rentas",{
            rentas:data,
            hasBook:data.length > 0})
    }

    getSignUpView(req,res){
        const id_libro = req.params.id
        return res.render("rentar_libro",{ 
            id_libro:id_libro,
            id_usuario: req.session.idUsuario
            })
    }

    async signUp(req,res){
        console.log(req.body)
        const newRenta = new Renta(req.body)
        console.log(newRenta)
        const validation = newRenta.validate()
        if(validation.success){
            await newRenta.save()
            await newRenta.actualizarLibro(newRenta.id_libro)
            return res.redirect("/mis_rentas")
        }
        return res.render("rentar_libro",{validation,renta:newRenta})

    }
}

module.exports = RentaController