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

