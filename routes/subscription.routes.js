import { Router } from "express";
import authorize from "../middleware/authorization.middleware.js";
import { createSubscription, deleteSubscription, getSubscriptionById, getSubscriptions, getUserSubscriptions, updateSubscription } from "../contollers/subscription.controller.js";

const subscriptionRouter = Router()

subscriptionRouter.get('/', getSubscriptions)

subscriptionRouter.get('/:id', authorize, getSubscriptionById)

subscriptionRouter.get('/user/:id',authorize, getUserSubscriptions)

subscriptionRouter.post('/', authorize, createSubscription)

subscriptionRouter.put('/:id', authorize, updateSubscription)

subscriptionRouter.delete('/:id', authorize, deleteSubscription)

subscriptionRouter.put('/:id/cancel', (req,res)=> res.send({title:'Cancel subscription'}))

subscriptionRouter.get('/upcoming-renewals', (req,res)=> res.send({title:'Get all upcoming renewals'}))


export default subscriptionRouter