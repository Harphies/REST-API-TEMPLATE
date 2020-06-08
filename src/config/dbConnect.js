const mongoose = require("mongoose");

// Connect to database
exports.connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL_LOCAL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log("connected to database");
  } catch (err) {
    console.error(err.message);
    // Exit process with Failure
    process.exit(1);
  }
};
