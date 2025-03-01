import { Router } from "express";
import { sendReminders } from "../contollers/workflow.controller";

const workflowRouter = Router();

workflowRouter.post('/subscriptions/reminder', sendReminders)

export default workflowRouter