import { Router } from "express";
import authorize from "../middleware/authorization.middleware.js";
import { createSubscription, getSubscriptions, getUserSubscriptions } from "../contollers/subscription.controller.js";

const subscriptionRouter = Router()

subscriptionRouter.get('/', getSubscriptions)
subscriptionRouter.get('/:id', (req,res)=> res.send({title:'Get subscription details'}))
subscriptionRouter.get('/user/:id',authorize, getUserSubscriptions)
subscriptionRouter.post('/', authorize, createSubscription)
subscriptionRouter.put('/:id', (req,res)=> res.send({title:'Update a subscription'}))
subscriptionRouter.delete('/:id', (req,res)=> res.send({title:'Delete a subscription'}))
subscriptionRouter.put('/:id/cancel', (req,res)=> res.send({title:'Cancel subscription'}))
subscriptionRouter.get('/upcoming-renewals', (req,res)=> res.send({title:'Get all upcoming renewals'}))


export default subscriptionRouter