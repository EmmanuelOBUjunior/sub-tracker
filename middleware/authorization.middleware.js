

const authorize = (req, res, next) => {
    try {
        let token
        if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
            token = req.headers.authorization.split(' ')[1]
        }

        if(!token){
            res.status(401).json({
                success: false,
                message: "Unauthorized"
            })
        }

        const decoded = 

    } catch (error) {
        res.status(401).json({
            success: false,
            message: "Unauthorized"
        })
        next(error)
    }

}

export default authorize