import {createRequire} from 'module'
import Subscription from '../models/subscription.model.js'
import dayjs from 'dayjs'
// import { workflowClient } from '../config/qstash.js'
// import { SERVER_URL } from '../config/env.js'
const require = createRequire(import.meta.url)
const {serve} = require('@upstash/workflow/express')

const REMINDERS = [7,5,2,1]

export const sendReminders = serve(async(context)=>{
    const {subscriptionId} = context.requestPayload
    const subscription = await fetchSubscription(context, subscriptionId)

    // await workflowClient.trigger({
    //     url: `${SERVER_URL}`
    // })

    if(!subscription || subscription.status !== 'active'){
        return
    }

    const renewalDate = dayjs(subscription.renewalDate)

    if(renewalDate.isBefore(dayjs())){
        console.log(`Renewal date has passed for subscription ${subscriptionId}. Stopping workflow!`)
    }

    for(const daysbefore of REMINDERS){
        const reminderDate = renewalDate.subtract(daysbefore, 'day')

        if(reminderDate.isAfter(dayjs)){
            await sleepUntilReminder(context, `Reminder ${daysbefore} days before`, reminderDate)
        }
        await triggerReminder(context, `Reminder ${daysbefore} days before`)
    }

})

const fetchSubscription = async(context, subscriptionId)=>{
    return await context.run('get subscription', async()=>{
        return Subscription.findById(subscriptionId).populate('user', 'name email')
    })
}

const sleepUntilReminder = async(context, label, date)=>{
    console.log(`Sleep until ${label} at ${date}`)
    await context.sleepUntil(label, date.toDate())
}

const triggerReminder = async(context, label)=>{
    return await context.run(label,()=>{
        console.log(`Triggering reminder ${label}`)
        //TODO: Send reminder email
    })
}