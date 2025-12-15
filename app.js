const express = require('express');
const path = require('path');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const hbs = require('hbs');
const cors = require('cors');
const passport = require('passport');

// DB connections
require('./app_server/models/db');
require('./app_api/models/db');
require('./app_api/config/passport');

// Passport config
require('./app_api/config/passport');

const app = express();

// Enable CORS for Angular
app.use(cors());

// View engine setup
app.set('views', path.join(__dirname, 'app_server', 'views'));
app.set('view engine', 'hbs');
hbs.registerPartials(path.join(__dirname, 'app_server', 'views', 'partials'));

// Logging, parsing, cookies
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Initialize passport
app.use(passport.initialize());

// Routes
const routes = require('./app_server/routes/index');
app.use('/', routes);

const apiRoutes = require('./app_api/routes/index');
app.use('/api', apiRoutes);

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// test endpoint
app.get('/api/ping', (req, res) => {
  res.json({ ok: true, time: new Date().toISOString() });
});

// Error handler for authentication errors 
app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    return res.status(401).json({ message: err.message });
  }
  next(err);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Express running at http://localhost:${PORT}`));

module.exports = app;
