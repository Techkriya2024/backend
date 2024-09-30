const express = require('express');
const app = express();

const {dbConnect} = require('./config/database');
dbConnect();

const cookieParser = require('cookie-parser');
const cors = require('cors');  
const fileUpload = require('express-fileupload');

// Remove Before Deployment (Dependency)
const dotenv = require('dotenv');

const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin:"*",
        credentials:true
    })
)
app.use(
    fileUpload({
        useTempFiles:true,
        tempFileDir:"/temp"
    })
)

app.get("/",(req,res) => {
    return res.status(200).json({
        success:true,
        message:"Server is Running..."
    });
});

app.listen(PORT,() => {
    console.log(`App is Running at PORT ${PORT}`);
})