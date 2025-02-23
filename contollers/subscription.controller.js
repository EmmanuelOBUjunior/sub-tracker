import Subscription from "../models/subscription.model.js"

export const createSubscription = async(req,res, next)=>{
    try {
        const subscription = await Subscription.
    } catch (error) {
        next(error)
    }
}