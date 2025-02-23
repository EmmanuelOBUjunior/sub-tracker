import express from 'express'
import {PORT} from './config/env.js'
import authRouter from './routes/auth.routes.js'
import userRouter from './routes/user.routes.js'
import subscriptionRouter from './routes/subscription.routes.js'
import connectToDatabase from './database/mongodb.js'
import errorMiddleware from './middleware/error.middleware.js'

const app = express()

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/users', userRouter)
app.use('/api/v1/subscriptions', subscriptionRouter)

app.use(errorMiddleware)

app.get('/', (req, res)=>{
    res.send("Welcome to Subscription Tracker API")
})

app.listen(PORT, async()=>{
    console.log(`Subscription Tracker API is running on http://localhost:${PORT}`)
    await connectToDatabase()
})


export default app