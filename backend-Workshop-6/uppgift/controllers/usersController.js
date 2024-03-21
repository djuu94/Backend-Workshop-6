const User = require('../models/User');

const bcrypt = require('bcrypt');
const saltRounds = 10; // value to salt the password

exports.getAllUsers = (req, res) => {
  User.find()
    .then(users => res.render('users', { users: users }))
    .catch(err => res.status(500).send(err.message));
};

exports.createUser = async (req, res) => {
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
  
    const newUser = new User({ 
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword // store the hashed password in the database
    });
  
    newUser.save()
      .then(user => res.redirect('/users')) // redirect to the users list after a user is created
      .catch(err => res.status(500).send(err.message));
  };

exports.updateUser = (req, res) => {
  User.findByIdAndUpdate(req.params.id, { 
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  }, { new: true })
    .then(user => res.redirect('/users')) // redirect to the users list after a user is updated
    .catch(err => res.status(500).send(err.message));
};

exports.deleteUser = (req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then(() => res.redirect('/users')) // redirect to the users list after a user is deleted
    .catch(err => res.status(500).send(err.message));
};