const Movie = require('../models/Movie');

exports.getAllMovies = (req, res) => {
  Movie.find()
    .then(movies => res.render('movies', { movies: movies }))
    .catch(err => res.status(500).send(err.message));
};

exports.createMovie = (req, res) => {
  const newMovie = new Movie({ title: req.body.title });
  newMovie.save()
    .then(movie => res.redirect('/movies'))
    .catch(err => res.status(500).send(err.message));
};

exports.updateMovie = (req, res) => {
  Movie.findByIdAndUpdate(req.params.id, { title: req.body.title }, { new: true })
    .then(movie => res.redirect('/movies')) 
    .catch(err => res.status(500).send(err.message));
};

exports.deleteMovie = (req, res) => {
  Movie.findByIdAndDelete(req.params.id)
    .then(() => res.redirect('/movies')) 
    .catch(err => res.status(500).send(err.message));
};