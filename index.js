const dotenv = require("dotenv");
const express = require("express");
const mongoose = require("mongoose");
const userRoute = require("./routes/userRoutes");
const authRoute = require("./routes/auth");

dotenv.config();

const db_url = process.env.MONGO_URL;
const port = process.env.PORT || 5000;

mongoose
    .connect(db_url)
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((err) => {
        console.log(err);
    });

const app = express();

app.use(express.json());

app.use("/api/v1/users", userRoute);
app.use("/api/v1/auth", authRoute);

app.listen(5000, () => {
    console.log(`Backend server is running on port : ${port}`);
});