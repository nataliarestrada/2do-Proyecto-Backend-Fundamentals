function DeleteBook(id){
    fetch("/eliminar_libro/" + id,{
        method:"DELETE"
    })
    .then((res)=>{
        return res.json()
    })
    .then((data)=>{
        return data
    })
}

Handlebars.registerHelper('ifCond', function(v1, v2) {
     if(v1 === v2) {
         return true
          /* return options.fn(this);  , options*/
    } 
    return false
    /* return options.inverse(this); */ });
