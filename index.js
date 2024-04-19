// Import environment variables
require('dotenv').config();

// Import express
const express = require('express');

// This middleware parses the request body and makes it available in the req.body property.
// It supports JSON, URL-encoded, and multipart/form-data requests.
const bodyParser = require('body-parser');

// Create application object
const app = express();

// Define port variable from the environment variable
const port = process.env.PORT || 4000;

app.set('view engine', 'jsx');
app.engine('jsx', require('express-react-views').createEngine());

// Parsing Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ extended: true }));

// import route files
const rosterRoutes = require("./routes/teamRoster");
const hitStatsRoutes = require("./routes/hittingStats");
const pitchStatsRoutes = require("./routes/pitchingStats");
const scheduleRoutes = require('./routes/teamSchedule');

// use route files
app.use('/api/roster', rosterRoutes);
app.use('/api/hitStats', hitStatsRoutes);
app.use('/api/pitchStats', pitchStatsRoutes);
app.use('/api/schedule', scheduleRoutes);


app.get('/roster', (req, res) => {
    res.render('viewRoster');
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
