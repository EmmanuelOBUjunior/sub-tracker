import mongoose from "mongoose"

export const signUp = async(req,res, next)=>{
    const session = await mongoose.startSession()
    session.startTransaction()

    try{
        const {name, email, password} = req.body
        const existingUser = await 

    }catch(error){
        session.abortTransaction()
        session.endSession()
        next(error)
    }
}

export const signIn = (req,res, next)=>{

}

export const signOut = (req,res, next)=>{

}