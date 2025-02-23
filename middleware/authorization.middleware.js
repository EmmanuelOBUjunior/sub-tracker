import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../config/env.js'
import User from '../models/user.model.js'

const authorize = async(req, res, next) => {
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

        const decoded = jwt.verify(token,  JWT_SECRET)

        const decodedUser = await User.findById(decoded.userId)

        if(!decodedUser){
            res.status(401).json({
                success: false,
                message: "Unauthorized"
            })
        }
        req.user = decodedUser
        next()

    } catch (error) {
        res.status(401).json({
            success: false,
            message: "Unauthorized",
            error: error.message
        })
        
    }

}

export default authorize