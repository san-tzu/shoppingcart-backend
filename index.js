const dotenv = require("dotenv");
const express = require("express");
const mongoose = require("mongoose");

const authRoute = require("./routes/auth");
const userRoute = require("./routes/userRoutes");
const productRoute = require("./routes/productRoutes");

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

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/users", userRoute);
app.use("/api/v1/products", productRoute);

app.listen(5000, () => {
    console.log(`Backend server is running on port : ${port}`);
});
