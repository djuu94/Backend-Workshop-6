// auth-controller.js

const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const saltRounds = 10;

router.post('/register', async (req, res) => {
  const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
  
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword
  });

  user.save()
    .then(user => {
      const token = jwt.sign({ id: user._id }, 'jwtPrivateKey');
      res.json({ token: token });
    })
    .catch(err => res.status(500).json({ error: err.message }));
});

router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).json({ error: 'Invalid email' });

    const validPassword = await bcrypt.compare(req.body.password, user.password);

    if (!validPassword) return res.status(400).json({ error: 'Invalid password' });

    const token = jwt.sign({ id: user._id }, 'jwtPrivateKey');
  
    res.cookie('authToken', token);
    
    res.redirect('/movies');
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;