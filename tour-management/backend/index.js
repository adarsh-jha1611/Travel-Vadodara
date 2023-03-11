import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { createRequire } from 'module';
import tourRoute from './routes/tours.js'
import userRoute from './routes/users.js'
import authRoute from './routes/auth.js'
import reviewRoute from './routes/reviews.js'
import bookingsRoute from './routes/bookings.js'

const require = createRequire(import.meta.url);


dotenv.config()
const app = express()
const port= process.env.PORT || 8000
const corsOption ={
    origin:true,
    credentials:true
}

//database connection

mongoose.set('strictQuery',false)
const connect = async () => { 
    try {
       await mongoose.connect(process.env.MONGO_URI,{
            // require("dotenv").config();
            // console.log(process.env.MONGO_URI,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // useCreateIndex: true,
        })
        console.log('MogoDB database connected')
        
    } catch (error) {
        console.log('MongoDB database not connected')
    }
}



app.use(express.json())
app.use(cors(corsOption))
app.use(cookieParser())
app.use('/api/v1/auth', authRoute)
app.use('/api/v1/tours', tourRoute)
app.use('/api/v1/users', userRoute)
app.use('/api/v1/reviews', reviewRoute)
app.use('/api/v1/booking', bookingsRoute)




app.listen(port, ()=>{
    connect();
    console.log('server listening to port', port)
})

// import { createRequire } from 'module';
// const require = createRequire(import.meta.url);
// require("dotenv").config();
// console.log(process.env.WEATHER_API_KEY)