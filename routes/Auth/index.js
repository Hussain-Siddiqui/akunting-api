const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../../Models/User')

const router = express.Router()

// JWT helper
const generateToken = (user) => {
  return jwt.sign({ id: user._id, email: user.email }, 'SECRET_KEY', {
    expiresIn: '1h',
  })
}

// Signup Route
router.post('/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body

    const existingUser = await User.findOne({ email })
    if (existingUser)
      return res.status(400).json({ message: 'User already exists' })

    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = await User.create({ name, email, password: hashedPassword })

    const token = generateToken(newUser)
    res.status(201).json({ message: 'Signup successful', token })
  } catch (err) {
    res.status(500).json({ message: 'Error signing up', error: err.message })
  }
})
router.get('/test', (req, res) => {
  res.send('Auth route working!')
})
// Login Route
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body

    const user = await User.findOne({ email })
    if (!user)
      return res.status(400).json({ message: 'Invalid email or password' })

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch)
      return res.status(400).json({ message: 'Invalid email or password' })

    const token = generateToken(user)
    res.status(200).json({ message: 'Login successful', token })
  } catch (err) {
    res.status(500).json({ message: 'Error logging in', error: err.message })
  }
})

// // Protected Profile Route
// router.get("/profile", async (req, res) => {
//   try {
//     const authHeader = req.headers.authorization;
//     if (!authHeader) return res.status(401).json({ message: "No token provided" });

//     const token = authHeader.split(" ")[1];
//     const decoded = jwt.verify(token, "SECRET_KEY");

//     const user = await User.findById(decoded.id).select("-password");
//     if (!user) return res.status(404).json({ message: "User not found" });

//     res.json({ user });
//   } catch (err) {
//     res.status(401).json({ message: "Invalid token", error: err.message });
//   }
// });

module.exports = router
