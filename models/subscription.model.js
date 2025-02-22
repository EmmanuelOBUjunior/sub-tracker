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
        min: [0 , "Subscription price must be greater than 0"],
        max: [1000000, "Subscription price must be less than 1000000"]
    },
    currency:{
        type:String,
        required:[true, "Subscription currency is required"],
        enum: ["USD", "EUR", "GBP"]
    },
    frequency:{
        type:String,
        required:[true, "Subscription frequency is required"],
        enum: ["daily", "weekly", "monthly", "yearly"]
    }

}, { timestamps: true });