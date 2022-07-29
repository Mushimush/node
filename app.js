const express = require('express');
const morgan = require('morgan');
const { default: mongoose } = require('mongoose');

const { render } = require('ejs');

const blogRoutes = require('./routes/blogRoutes')



// express app
const app = express();

//connect to mongoDB
const dbURI = 'mongodb+srv://munchi:stanleY1@nodetutorial.dthpg.mongodb.net/?retryWrites=true&w=majority'

mongoose.connect(dbURI)
  .then(app.listen(3000))
  .catch(err => console.log(err));

// register view engine
app.set('view engine', 'ejs');

// middleware & static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use((req, res, next) => {
  res.locals.path = req.path;
  next();
});

// routes
app.get('/', (req, res) => {
  res.redirect('/blogs');
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
});

// blog routes
app.use('/blogs', blogRoutes);

// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});