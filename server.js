const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const colors = require('colors')
const fileupload = require('express-fileupload')
const cookieParser = require('cookie-parser')
const mongoSanitize = require('express-mongo-sanitize')
const helmet = require('helmet')
const xss = require('xss-clean')
const rateLimit = require('express-rate-limit')
const hpp = require('hpp')
const cors = require('cors')
const swaggerJsDoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')
const errorHandler = require('./backend/middleware/error')
const { connectDB } = require('./backend/config/db')
const { swaggeroption } = require('./backend/utils/apiGenerator')
const authRoute = require('./backend/routes/authRoutes')
const app = express()

// Configure the documentation for Auto-generate
const swaggerDocs = swaggerJsDoc(swaggeroption)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))

// Load env variables
require('dotenv/config')
// Connect to database
connectDB()

// Route files
app.use('/api/v1/auth', authRoute)

// middlewares
app.use(express.json()) // body-parser
app.use(cookieParser()) // cookier parser
app.use(fileupload()) // File uploading
app.use(mongoSanitize()) // Sanitize data
app.use(helmet()) // Set security headers
app.use(xss()) // Prevent XSS attacks
app.use(hpp()) // Prevent http param pollution
app.use(cors()) // Enable CORS

// Rate limiting
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 mins
  max: 100,
})
app.use(limiter)

// Dev loogging middleware
if (process.env.NODE_ENV == 'development') {
  app.use(morgan('dev'))
}
const PORT = process.env.PORT || 5000

const server = app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
)

// Handle unhandled promise rejections
process.on(`unhandledRejection`, (err, promise) => {
  console.log(`Error:${err.message}`.red)
})
