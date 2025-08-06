import express from 'express'
import { getCars, getUserData, loginUser, registerUser } from '../controllers/userController.js'
import { protect } from '../middlewares/auth.js'

const userRouter = express.Router()

userRouter.post('/login',loginUser)
userRouter.post('/register',registerUser)
userRouter.get('/data',protect,getUserData)
userRouter.get('/cars',getCars)

export default userRouter