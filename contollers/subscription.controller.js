import Subscription from '../models/subscription.model.js'
import { workflowClient } from '../config/upstash.js'
import { SERVER_URL } from '../config/env.js'

export const createSubscription = async (req, res, next) => {
  try {
    const subscription = await Subscription.create({
      ...req.body,
      user: req.user._id,
    });

    const { workflowRunId } = await workflowClient.trigger({
      url: `${SERVER_URL}/api/v1/workflows/subscription/reminder`,
      body: {
        subscriptionId: subscription.id,
      },
      headers: {
        'content-type': 'application/json',
      },
      retries: 0,
    })

    res.status(201).json({ success: true, data: { subscription, workflowRunId } });
  } catch (e) {
    next(e);
  }
}

export const getUserSubscriptions = async (req, res, next) => {
  try {
    // Check if the user is the same as the one in the token
    if(req.user.id !== req.params.id) {
      const error = new Error('You are not the owner of this account');
      error.status = 401;
      throw error;
    }

    const subscriptions = await Subscription.find({ user: req.params.id });

    res.status(200).json({ success: true, data: subscriptions });
  } catch (e) {
    next(e);
  }
}

export const getSubscriptions = async(req,res,next)=>{
  try{
    const subscriptions = await Subscription.find().populate('user', 'name email')

    if(!subscriptions){
      const error = new Error("There are no subscriptions")
      error.status = 404
      throw error
    }
    res.status(200).json({success: true, data: subscriptions})

  }catch(error){
    next(error)
  }
}


export const updateSubscription = async(req,res,next)=>{
  try{
    const {id} = req.params

    const getSubscription = await Subscription.findById(id)

    if(!getSubscription){
      const error = new Error(`Subscription with id $id} cannot be found`)
      error.status = 404
      throw error
    }

    if(getSubscription.user.id !== req.user._id){
      const error = new Error('You are not authorised to edit this subscription')
      error.status = 403
      throw error
    }
    
    const subscription = await Subscription.findByIdAndUpdate(
      id,
      req.body,
      {runValidators:true, new:true}
    )
    if(!subscription){
      const error = new Error(`Subscription with id ${id} not found`)
      error.status = 404
      throw error
    }


    res.status(200).json({success: true, data: subscription})

  }catch(error){
    next(error)
  }
}


export const getSubscriptionById = async(req,res,next)=>{
  try {
    const subscription = await Subscription.findById(req.params.id).populate('user', 'name email')

    if(!subscription){
      const error = new Error(`Subscription with id ${req.params.id} not found`)
      error.status = 404
      throw error
    }

    if(subscription.user.id.toString() !== req.user._id.toString()){
      const error = new Error('You are not the owner of this subscription')
      error.status = 403
      throw error
    }

    res.status(200).json({success: true, data: subscription})

  } catch (error) {
    next(error)
  }
}