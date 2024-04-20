// Import environment variables
require('dotenv').config();

// Import express
const express = require('express');

// This middleware parses the request body and makes it available in the req.body property.
// It supports JSON, URL-encoded, and multipart/form-data requests.
const bodyParser = require('body-parser');
// Custom middleware
const loggingMiddleware = require('./middleware/loggingMiddleware');
const validatePlayerMiddleware = require('./middleware/validatePlayerMiddleware');

// Create application object
const app = express();

// Define port variable from the environment variable
const port = process.env.PORT || 4000;

const path = require('path');


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jsx');
app.engine('jsx', require('express-react-views').createEngine());

// Static file for CSS
app.use(express.static('public'));

// Parsing Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ extended: true }));

// Apply logging middleware to all routes
app.use(loggingMiddleware);

// import route files
const rosterRoutes = require("./routes/teamRoster");
const hitStatsRoutes = require("./routes/hittingStats");
const pitchStatsRoutes = require("./routes/pitchingStats");
const scheduleRoutes = require('./routes/teamSchedule');

// Apply validation middleware to specific routes
app.post('/api/roster', validatePlayerMiddleware, rosterRoutes);
app.patch('/api/roster/:id', validatePlayerMiddleware, rosterRoutes);

// use route files
app.use('/api/roster', rosterRoutes);
app.use('/api/hitStats', hitStatsRoutes);
app.use('/api/pitchStats', pitchStatsRoutes);
app.use('/api/schedule', scheduleRoutes);

// Team roster View
app.get('/roster', (req, res) => {
    res.render('ViewRoster');
});

app.get('/addPlayer', (req, res) => {
    res.render('AddPlayerForm');
});

// 404 Middleware
app.use((req, res) => {
    res.status(404);
    res.json({ error: "Resource Not Found" });
  });

// Server Listener
app.listen(port, () => {
    console.log(`Listening port on ${port}`);
});
