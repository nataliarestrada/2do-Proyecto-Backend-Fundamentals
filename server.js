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
            //const newDate = new DateTime.fromJSDate(date)
            const newDate = new DateTime(date)
            return newDate.toFormat("yyyy-MM-dd")
        },
        igual:function(v1,v2){
            if (v1 === v2){
                return true
            }
            return false
        },
        controlDate:function(fecha_fin,fecha_hoy){
            if (fecha_fin > fecha_hoy){
                return true
            }
            return false
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