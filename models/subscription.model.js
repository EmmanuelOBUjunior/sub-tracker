import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Subscription name is required"],
      trim: true,
      unique: true,
      minLength: 2,
      maxLength: 100,
    },
    price: {
      type: Number,
      required: [true, "Subscription price is required"],
      min: [0, "Subscription price must be greater than 0"],
      max: [1000000, "Subscription price must be less than 1000000"],
    },
    currency: {
      type: String,
      required: [true, "Subscription currency is required"],
      enum: ["USD", "EUR", "GBP"],
      default: "USD",
    },
    frequency: {
      type: String,
      required: [true, "Subscription frequency is required"],
      enum: ["daily", "weekly", "monthly", "yearly"],
    },
    category: {
      type: String,
      required: [true, "Subscription category is required"],
      enum: [
        "sports",
        "entertainment",
        "health",
        "fitness",
        "education",
        "lifestyle",
        "finance",
        "other",
      ],
    },
    paymentMethod: {
      type: String,
      required: true,
      trim: true,
    },
    status:{
        type: String,
        enum: ["active", "canceled", "expired"],
        default: 'active'
    },
    startDate:{
        type: Date,
        required: [true, "Subscription start date is required"],
        validate: {
            validator: (value) => value <= new Date(),
            message: "Subscription start date muct be in the past"
        }
    },
    renewalDate:{
        type: Date,
        validate: {
            validator: function(value){
                return value > this.startDate;
            },
            message: "Subscription renewal date must be after the start date"
        }
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index:true
    }
  },
  { timestamps: true }
);


//Auto calculate renewal date if missing
subscriptionSchema.pre("save", function (next){
    if(!this.renewalDate){
        const renewalPeriods={
            daily: 1,
            weekly: 7,
            monthly: 30,
            yearly: 365
        }

    this.renewalDate = new Date(this.startDate);
    this.renewalDate.setDate(this.renewalDate.getDate() + renewalPeriods[this.frequency]);
    }
    //Auto update the status if renewal date has passed
    if(this.renewalDate < new Date()){
        this.status = "expired";
    }
    next()
})

const Subscription = mongoose.model("Subscription", subscriptionSchema);

export default Subscription;
