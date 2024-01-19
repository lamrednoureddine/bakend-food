const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv').config()
const mongoose = require("mongoose")
const authController = require('./controllers/authController')
const productController = require('./controllers/productController')
const uploadController = require('./controllers/uploadController')
const userRoutes = require('./routes/userRoutes');
const orderController = require('./controllers/orderController')
const app = express()


// connect our db
mongoose.set('strictQuery', false)
mongoose.connect(process.env.MONGO_URL, () => console.log('DB is successfully connected'))
 
// routes & middlewares
// those two middlewares make req.body accessible, otherwise it would be undefined!!!
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use('/images', express.static('public/images'))
app.use('/auth', authController)
app.use('/users', userRoutes,authController);
app.use('/product', productController),
app.use('/order', orderController);
app.use('/upload', uploadController)
// start our server
app.listen(process.env.PORT, () => console.log(`Server has been started successfully ${process.env.PORT}`))

// server is on port 5000, client is on port 3000,
// we are going to get a cors ERROR!!, but cors() removes that's error require('dotenv').config()require('dotenv').config();