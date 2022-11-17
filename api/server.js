const express = require('express')
const app = express()
const PORT = process.env.PORT || 4000;
const cookieParser = require('cookie-parser')
const cors = require('cors')
require('dotenv').config()

const allowedOrigins = ['http://localhost:3000']

app.use(cors({ credentials: true, origin: allowedOrigins }))  
app.use(express.json())
app.use(cookieParser())

const userRoutes = require('./routes/userRoutes')
const blogRoutes = require('./routes/blogRoutes')

app.use('/api', userRoutes)
app.use('/api', blogRoutes)

app.listen(PORT, () => console.log(`Server running on ${PORT} ;)`))