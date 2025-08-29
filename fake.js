const router = require('express').Router()

router.get('/profile', (req, res) => {
  res.send('Hello from g')
})
module.exports = router
