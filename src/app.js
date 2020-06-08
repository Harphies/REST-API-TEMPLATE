const express = require("express");
const mongoose = require("mongoose");
require("dotenv/config");
const cors = require("cors");
const app = express();
const { connectDB } = require("./config/dbConnect");
const userRoute = require("./routes/userRoutes");
const PORT = process.env.PORT || 5000;
// Middlewares
app.use(cors());
app.use(express.json());
app.use("/api/user", userRoute);
// Connect to database
connectDB();
// server port Initialization
app.listen(PORT, () => console.log(`App ruunig on port ${PORT}`));
