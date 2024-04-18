// Import environment variables
require('dotenv').config();

// Import express
const express = require('express');

// Create application object
const app = express();

// Define port variable from the environment variable
const port = process.env.PORT || 4000;

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


app.get('/', (req, res) => {
    res.send('Brians World!');
});


// Server Listener
app.listen(port, () => {
    console.log(`Listening port on ${port}`);
});
