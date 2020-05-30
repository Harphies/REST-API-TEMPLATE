const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv/config");
const cors = require("cors");
const app = express();
const router = require("./router");
const PORT = process.env.PORT || 5000;
// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use("/", router);

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

app.listen(PORT, () => console.log(`App ruunig on port 4000`));
