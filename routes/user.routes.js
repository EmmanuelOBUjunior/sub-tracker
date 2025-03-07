import { Router } from "express";
import { getUser, getUsers } from "../contollers/users.controller.js";
import authorize from "../middleware/authorization.middleware.js";

const userRouter = Router()

userRouter.get('/', getUsers)
userRouter.get('/:id',authorize,getUser)
userRouter.post('/', (req, res)=> res.send({title: 'Create new user'}))
userRouter.put('/:id', (req, res)=> res.send({title: 'Update a user'}))
userRouter.delete('/', (req, res)=> res.send({title: 'Delete user'}))


export default userRouter