const Director = require('../models/Director');

exports.getAllDirectors = (req, res) => {
  Director.find()
    .populate('directors')
    .then(directors => res.render('directors', { directors: directors }))
    .catch(err => res.status(500).send(err.message));
};

exports.createDirector = (req, res) => {
  const newDirector = new Director({
    name: req.body.name,
    directors: req.body.directors
  });

  newDirector.save()
    .then(director => res.redirect('/directors')) 
    .catch(err => res.status(500).send(err.message));
};

exports.updateDirector = (req, res) => {
  Director.findByIdAndUpdate(req.params.id, {
    name: req.body.name,
    directors: req.body.directors
  }, { new: true })
    .then(director => res.redirect('/directors'))
    .catch(err => res.status(500).send(err.message));
};

exports.deleteDirector = (req, res) => {
  Director.findByIdAndDelete(req.params.id)
    .then(() => res.redirect('/directors')) 
    .catch(err => res.status(500).send(err.message));
};