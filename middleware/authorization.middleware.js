const authorize = (req, res, next) => {
    try {
        
    } catch (error) {
        res.status(401).json({
            success: false,
            message: "Unauthorized"
        })
        next(error)
    }

}

export default authorize