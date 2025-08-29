const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
// const authRoutes = require('./routes/Auth')
const dotenv = require('dotenv')
dotenv.config()
const app = express()
app.use(bodyParser.json())

// MongoDB connection
// mongoose
//   .connect(process.env.DB_URL, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => console.log('MongoDB Connected'))
//   .catch((err) => console.error(err))

// Routes
// app.use('/api/auth', authRoutes)

// const PORT = 5000
// app.listen(PORT, () =>
//   console.log(`Server running on http://localhost:${PORT}`)
// )

app.get('/b', (req, res) => {
  res.send('Hello World!')
})

app.use('/user', require('./fake'))

app.listen(6060, () => {
  console.log('Server is running on port 6060')
})
