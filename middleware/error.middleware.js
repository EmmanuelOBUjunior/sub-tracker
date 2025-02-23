const errorMiddleware = (err, req, res, next) => {
    try{
    let error = {...err}
    error.message = err.message
    console.log(err)

    if(err.name === "CastError"){
        const message = `Resource not found. Invalid: ${err.path}`
        error = new Error(message)
        error.statusCode = 404
    }
    }catch(error){
        console.log(error)
        next(error)
    }
}