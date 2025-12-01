const express = require('express');
const path = require('path');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const hbs = require('hbs');
require('./app_server/models/db');
require('./app_api/models/db');
const app = express();
app.set('views', path.join(__dirname, 'app_server', 'views'));
app.set('view engine', 'hbs');
hbs.registerPartials(path.join(__dirname, 'app_server', 'views', 'partials'));  app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
const routes = require('./app_server/routes/index');
app.use('/', routes);
const apiRoutes = require('./app_api/routes/index');
app.use('/api', apiRoutes);
app.use(express.static(path.join(__dirname, 'public')));
app.get('/api/ping', (req, res) => {
  res.json({ ok: true, time: new Date().toISOString() });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Express running at http://localhost:${PORT}`));

module.exports = app;
