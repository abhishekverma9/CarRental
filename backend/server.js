import express from 'express'
import 'dotenv/config'
import cors from 'cors'
import connectDB from './config/db.js'
import userRouter from './routes/userRoutes.js'
import ownerRouter from './routes/ownerRoutes.js'
import bookingRouter from './routes/bookingRoute.js'

//Initialize express app
const app = express()
const port = process.env.PORT || 3000

//connect database
await connectDB()

//Middlewares
app.use(cors())
app.use(express.json())

//Api Endpoints
app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.use('/api/user',userRouter)
app.use('/api/owner',ownerRouter)
app.use('/api/bookings',bookingRouter)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
