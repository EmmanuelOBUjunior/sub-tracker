import {createRequire} from 'module'
import Subscription from '../models/subscription.model'
import dayjs from 'dayjs'
const require = createRequire(import.meta.url)
const {serve} = require('@upstash/workflow/express')

const REMAINDERS = [7,5,2,1]

export const sendRemainders = serve(async(context)=>{
    const {subscriptionId} = context.requestPayload
    const subscription = await fetchSubscription(context, subscriptionId)

    if(!subscription || subscription.status !== 'active'){
        return
    }

    const renewalDate = dayjs(subscription.renewalDate)

    if(renewalDate.isBefore(dayjs())){
        console.log(`Renewal date has passed for subscription ${subscriptionId}. Stopping workflow!`)
    }

    for(const daysbefore of REMAINDERS){
        const remainderDate = renewalDate.subtract(daysbefore, 'day')

        if(remainderDate.isAfter(dayjs)){
            sleepUntilReminder
        }
    }

})

const fetchSubscription = async(context, subscriptionId)=>{
    return await context.run('get subscription', ()=>{
        return Subscription.findById(subscriptionId).populate('user').select('name email')
    })
}

const sleepUntilReminder = ()=>{

}