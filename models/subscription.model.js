import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true, "Subscription name is required"],
        trim:true,
        unique:true,
        minLength: 2,
        maxLength: 100
    },
    price:{
        type:Number,
        required:[true, "Subscription price is required"],
        min: [0 , "Subscription price must be greater than 0"]
    }

}, { timestamps: true });