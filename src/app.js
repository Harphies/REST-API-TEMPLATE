const express = require("express");
const mongoose = require("mongoose");
require("dotenv/config");
const cors = require("cors");
const app = express();
const authRoute = require("./routes/authRoute");
const postRoute = require("./routes/postRoute");
const PORT = process.env.PORT || 5000;
// Middlewares
app.use(cors());
app.use(express.json());
app.use("/api/user", authRoute);
app.use("/api/post", postRoute);

// Connect to database
mongoose
  .connect(process.env.DB_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connected");
  })
  .catch((err) => {
    console.error(err.message);
  });

// server port Initialization
app.listen(PORT, () => console.log(`App ruunig on port 5000`));
