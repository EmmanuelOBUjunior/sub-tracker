import express from 'express'

const app = express()

app.get('/', (req, res)=>{
    res.send("Welcome to Subscription Tracker API")
})

app.listen(3000, ()=>{
    console.log("Subscription Tracker API is running on http://localhost:3000")
})