const path = require('path');

const express = require('express');

const helpers = require('./utils/heplers');

// after npm install express-handlebars
const exphbs = require('express-handlebars');
const hbs = exphbs.create({helpers})

const routes = require('./controllers/');

const sequelize = require('./config/connection');

const app = express();

const PORT = process.env.PORT || 3001;

// Cookie storage
const session = require('express-session');

const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sess = {
  secret: 'Super secret secret',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// express.static -- middleware takes all content in folder and serve as static assets
app.use(express.static(path.join(__dirname, 'public')));
// express handlebars
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// turn on routes
app.use(routes);

// turn on connection to db and server
// sync means that this is a sequalize taking the models and connecting them to associated database tables.
// force: true is the same as MySQL DROP TABLE IF EXISTS ... Used when a model has been changed
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Now Listening on ${PORT}`));
});
