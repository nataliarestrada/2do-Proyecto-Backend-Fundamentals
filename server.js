const path = require("path")
const express = require("express")
const { port, secret } = require("./config")
const {engine} = require("express-handlebars")
const session = require("express-session")
/* const { DateTime } = require("luxon") */


//Importando rutas
const userRouter = require("./routes/usuarios")
const authRouter = require("./routes/auth")


const app = express()

app.use(express.static(path.join(__dirname,"static")))
//Middleware
app.use(express.urlencoded({extended:true})) // Transforma de x-www-form-urlencoded a Object de JS
app.use(session({
    secret:secret,
    resave:false,
    saveUninitialized:false
}))

app.engine('hbs',engine({
    extname:"hbs",
    partialsDir:path.join(__dirname,"views","components"),
    /* helpers:{
        formatDate:function(date){
            const newDate = new DateTime(date)
            return newDate.toFormat("yyyy-MM-dd")
        }
    } */
}))
app.set("view engine",'hbs')
app.set("views","views")


app.use(userRouter)
app.use(authRouter)



app.listen(port,function(){
    console.log("Funcionando... http://localhost:"+port)
})