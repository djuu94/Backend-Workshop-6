const express = require('express');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');

const moviesRoutes = require('./routes/moviesRoutes');
const directorsRoutes = require('./routes/directorsRoutes');
const userRoutes = require('./routes/usersRoutes');
const authController = require('./controllers/authController');
const authRoutes = require('./routes/authRoutes');

const app = express();
const port = 8000;



mongoose.connect('mongodb://127.0.0.1:27017/MovieDB')
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride('_method'));
app.use(cookieParser());
app.use(morgan('dev'))

app.use(authController);
app.use(authRoutes);


const hbs = exphbs.create({
  extname: '.hbs',
  defaultLayout: 'layout',
  runtimeOptions: {
    allowProtoPropertiesByDefault: true,
    allowProtoMethodsByDefault: true,
  },
});

app.engine('.hbs', hbs.engine);
app.set('view engine', '.hbs');
app.use(moviesRoutes);
app.use(directorsRoutes);
app.use(userRoutes);



app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});


// Sidan nås via /login 
// Lyckat login gör /movies tillgänglig