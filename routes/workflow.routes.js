import { Router } from "express";
import { sendReminders } from "../contollers/workflow.controller";

const workflowRouter = Router();

workflowRouter.post('/', sendReminders)

export default workflowRouter