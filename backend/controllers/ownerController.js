import imagekit from "../config/imageKit.js"
import Booking from "../models/Booking.js"
import Car from "../models/Car.js"
import User from "../models/User.js"
import fs from 'fs'

//API to change role 
const changeRoleToOwner = async (req, res) => {
    try {
        const { _id } = req.user
        await User.findByIdAndUpdate(_id, { role: "owner" })
        res.json({ success: true, message: "Now you can list your cars" })
    } catch (error) {
        res.json({ success: false, message: error.message })
        console.log(error)
    }
}
//API to list car
const addCar = async (req, res) => {
    try {
        const { _id } = req.user
        let car = JSON.parse(req.body.carData)
        const imageFile = req.file

        //Upload image to imageKit
        const fileBuffer = fs.readFileSync(imageFile.path)
        const response = await imagekit.upload({
            file: fileBuffer,
            fileName: imageFile.originalname,
            folder: '/cars'
        })
        // Optimization through imagekit url transformation
        var optimizedImageURL = imagekit.url({
            path: response.filePath,
            transformation: [
                {width:'1280'}, // Width resizing
                {quality: 'auto'}, // Auto compression
                {format: 'webp'} // Convert to modern format
            ]
        });
        const image = optimizedImageURL
        await Car.create({...car, owner:_id, image})

        res.json({success: true, message: "Car Added"})
    } catch (error) {
        res.json({ success: false, message: error.message })
        console.log(error)
    }
}
//API to list owner car
const getOwnerCars = async (req,res) => {
    try {
        const { _id } = req.user
        const cars = await Car.find({owner:_id})
        res.json({success: true,cars})
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}
//API to Toggle car availability
const toggleCarAvailability = async (req,res) => {
    try {
        const { _id } = req.user
        const {carId} = req.body
        const car = await Car.findById(carId)

        //checking if car belongs to the user
        if(car.owner.toString() !== _id.toString()){
           return res.json({ success: false, message: "Unauthorized" }) 
        }
        car.isAvaliable = !car.isAvaliable
        await car.save()
        res.json({ success: true, message: "Availability toggled" }) 
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}
//API to Delete car
const deleteCar = async (req,res) => {
    try {
        const { _id } = req.user
        const {carId} = req.body
        const car = await Car.findById(carId)

        //checking if car belongs to the user
        if(car.owner.toString() !== _id.toString()){
           return res.json({ success: false, message: "Unauthorized" }) 
        }
        car.owner = null
        car.isAvaliable = false
        await car.save()
        res.json({ success: true, message: "Availability toggled" }) 
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}
//API to get dashboard data
const getDashboardData = async (req,res) => {
    try {
        const { _id,role } = req.user
        if(role !== "owner"){
            return res.json({ success: false, message: "Unauthorized" }) 
        }
        const cars = await Car.find({owner:_id})
        const bookings = await Booking.find({owner:_id}).populate("car").sort({createdAt: -1})

        const pendingBookings = await Booking.find({owner:_id,status:"pending"})
        const completedBookings = await Booking.find({owner:_id,status:"confirmed"})
        
        //calculate monthly revenue from bookings where status is confirmed
        const monthlyRevenue = bookings.slice().filter(booking => booking.status === 'confirmed').reduce((acc,booking)=>acc+booking.price,0)

        const dashboardData = {
            totalCars: cars.length,
            totalBookings: bookings.length,
            pendingBookings: pendingBookings.length,
            completedBookings: completedBookings.length,
            recentBookings: bookings.slice(0,3),
            monthlyRevenue
        }
        res.json({ success: true, dashboardData }) 
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    } 
}
//API to update user image
const updateUserImage = async (req,res) => {
    try {
        const { _id } = req.user
        const imageFile = req.file

        //Upload image to imageKit
        const fileBuffer = fs.readFileSync(imageFile.path)
        const response = await imagekit.upload({
            file: fileBuffer,
            fileName: imageFile.originalname,
            folder: '/users'
        })
        // Optimization through imagekit url transformation
        var optimizedImageURL = imagekit.url({
            path: response.filePath,
            transformation: [
                {width:'400'}, // Width resizing
                {quality: 'auto'}, // Auto compression
                {format: 'webp'} // Convert to modern format
            ]
        });
        const image = optimizedImageURL
        await User.findByIdAndUpdate(_id,{image})
        res.json({ success: true, message: "Image Updated" })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}
export { changeRoleToOwner, addCar,getOwnerCars,toggleCarAvailability,deleteCar,getDashboardData,updateUserImage }