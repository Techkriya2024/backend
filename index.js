const express = require('express');
const app = express();

const {dbConnect} = require('./config/database');
dbConnect();

const cookieParser = require('cookie-parser');
const cors = require('cors');
const fileUpload = require('express-fileupload');

// Remove Before Deployment (Dependency)
const dotenv = require('dotenv');

const routes = require('./routes');

const PORT = process.env.PORT || 4000;
const ENV = process.env.NODE_ENV || 'development';

const HOST = ENV === "development" ? "localhost" : "0.0.0.0";

app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin: "*",
        credentials: true
    })
)
app.use(
    fileUpload({
        useTempFiles: true,
        tempFileDir: "/temp"
    })
)

app.use("/api/v1", routes);

app.get("/", (_, res) => {
    return res.status(200).json({
        success: true,
        message: "Server is Running..."
    });
});

app.listen(PORT, HOST, () => {
    console.log(`App is Running at ${HOST}:${PORT}`);
})