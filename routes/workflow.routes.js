import { Router } from "express";

const workflowRouter = Router();

workflowRouter.get('/', (req,res)=>({title: 'Workflow'}))

export default workflowRouter