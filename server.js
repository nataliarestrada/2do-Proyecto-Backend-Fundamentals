const path = require("path")
const express = require("express")
const { port, secret } = require("./config")
const {engine} = require("express-handlebars")
const session = require("express-session")
const { DateTime } = require("luxon")


//Importando rutas
const userRouter = require("./routes/usuarios")
const authRouter = require("./routes/auth")
const bookRouter = require("./routes/libros")
const addSessionToTemplate = require("./middlewares/addSessionToTemplate")
const rentaRouter = require("./routes/renta")
const { log } = require("console")


const app = express()

app.use(express.static(path.join(__dirname,"static")))
//Middleware
app.use(express.urlencoded({extended:true})) // Transforma de x-www-form-urlencoded a Object de JS
app.use(session({
    secret:secret,
    resave:false,
    saveUninitialized:false
}))
app.use(addSessionToTemplate)

app.engine('hbs',engine({
    extname:"hbs",
    partialsDir:path.join(__dirname,"views","components"),
    helpers:{
        formatDate:function(date){
            //console.log(date);
            //const newDate = new DateTime(date)
            const newDate = DateTime.fromJSDate(date)
            return newDate.toFormat("yyyy-MM-dd")
        },
        igual:function(v1,v2){
            if (v1 === v2){
                return true
            }
            return false
        },
        controlDate:function(fecha_fin,fecha_hoy){
            if (fecha_fin < fecha_hoy){
                return true
            }
            return false
        },
        formatHour:function(date){
            const newDate = DateTime.fromJSDate(date)
            

            const diff = newDate.diffNow(["minutes","hours","days"]).toObject()
            if(diff.days<0){
                return `Hace ${-1*diff.days} días`
            }else if(diff.hours<0){
                return `Hace ${-1*diff.hours} horas`
            }else if(diff.minutes<0){
                return `Hace ${Number.parseInt(-1*diff.minutes)} minutos`
            }
        },
        entrega:function(fecha_inicio,fecha_fin){
            const f1 = DateTime.fromJSDate(fecha_inicio)
            const f2 = DateTime.fromJSDate(fecha_fin)
            const diff={
                "minutes":f2.minute-f1.minute,
                "hours": f2.hour-f1.hour,
                "days": f2.day-f1.day
            }
            
            if(diff.days>0){
                return `Faltan ${diff.days} días`
            }else if(diff.hours>0){
                return `Faltan ${diff.hours} horas`
            }else if(diff.minutes>0){
                return `Faltan ${Number.parseInt(diff.minutes)} minutos`
            }

        }
    }
}))
app.set("view engine",'hbs')
app.set("views","views")


app.use(userRouter)
app.use(authRouter)
app.use(bookRouter)
app.use(rentaRouter)



app.listen(port,function(){
    console.log("Funcionando... http://localhost:"+port)
})