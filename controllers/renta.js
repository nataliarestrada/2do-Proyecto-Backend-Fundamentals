const Renta= require("../models/Renta")

class RentaController{

    //vista de las rentas que realizo el usuario junto con la info del libro
    async getRentaView(req,res){
        const data = await Renta.readAll(req.session.idUsuario)
        //console.log(data);
        const fecha = Date.now();
        const hoy = new Date(fecha);
        return res.render("mis_rentas",{
            rentas:data,
            hasBook:data.length > 0,
            inactivo: "INACTIVO",
            fecha_hoy: hoy
        })
    }

    //vista para devolver el libro y registrar la calificacion si quiere
    async getReviewBookView(req,res){
        const idrenta = req.params.id
        const fecha = Date.now();
        const hoy = new Date(fecha);
        //traigo la renta
        const rentaData = await Renta.getRentaReview(idrenta)
        return res.render("calificar_libro",{
            renta:rentaData,
            fecha_hoy: hoy
        })

    }

    //devuelvo el libro, cambio el estado de la renta, guardo la calificacion,cambio el estado del libro
    async returnBook(req,res){
        const data = req.body
        //console.log(data)
        await Renta.devolverCalificarLibro(data.id,data.calificacion)
        const rentaData = await Renta.getIdLibro(data.id)
        //await Renta.devolver(data.id)
        await Renta.actualizarLibroEstado(rentaData[0].id_libro)
        res.redirect("/mis_rentas")
        //res.redirect("/return_libro/"+data.id)
    }

    //vista al formulario para rentar el libro
    getSignUpView(req,res){
        const id_libro = req.params.id
        return res.render("rentar_libro",{ 
            id_libro:id_libro,
            id_usuario: req.session.idUsuario
            })
    }

    //registro la renta, y cambio el estado del libro
    async signUp(req,res){
        //console.log(req.body)
        const newRenta = new Renta(req.body)
        //console.log(newRenta)
        const validation = newRenta.validate()
        if(validation.success){
            await newRenta.save()
            await newRenta.actualizarLibro(newRenta.id_libro)
            return res.redirect("/mis_rentas")
        }
        return res.render("rentar_libro",{validation,renta:newRenta})

    }

    // async returnBook(req,res){
    //     const idrenta= req.params.id
    //     const rentaData = await Renta.getIdLibro(idrenta)
    //     await Renta.devolver(idrenta)
    //     await Renta.actualizarLibroEstado(rentaData[0].id_libro)
    //     res.redirect("/mis_rentas")

    // }
}

module.exports = RentaController