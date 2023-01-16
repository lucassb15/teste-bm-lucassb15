const mongoose = require('mongoose');
mongoose.connect
mongoose.set("strictQuery", true);
mongoose.connect("mongodb+srv://admin:6JMOUlAasIRpLE23@bmtest.savpqao.mongodb.net/test")

const express = require('express');
const app = express();
const path = require('path')


// USER Routes
const userRoute = require('./routes/userRoute')
app.use('/', userRoute);

app.listen(3000, function () {
    console.log('Server is running')
})