import { emailTemplates } from "./email-template.js"

export const sendReminderEmail = async({to, type, subscription}) =>{
if(!to||!type) throw new Error("Missing required parameters!!")

const template = emailTemplates.find((t)=> t.label === type)

if(!template) throw new Error("Invalid email type")


}