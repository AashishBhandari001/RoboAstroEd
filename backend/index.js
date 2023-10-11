const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRouter = require('./routes/user.route.js');
dotenv.config(); //initialize dotenv

mongoose.connect(process.env.MONGODB).then(() => {
    console.log('Connected to MongoDB!!');
}).catch(err => {
    console.log('Error connecting to MongoDB', err.message);
});

const app = express();
// app.use("/api/user", userRouter);   ));

app.listen(8080, () => {
    console.log('Server is running on port 8080!!');
});

app.use("/backend/user", userRouter);