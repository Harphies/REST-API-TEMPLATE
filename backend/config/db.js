const mongoose = require('mongoose')

// connect to db
exports.connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    })
    console.log(
      `MongoDB Connected: ${conn.connection.host}`.cyan.underline.bold
    )
  } catch (err) {
    console.error(err.message)
    // Exit process with failure
    process.exit(1)
  }
}
