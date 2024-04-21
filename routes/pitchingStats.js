// Import Express Framework
const express = require('express');

// Create Router
const router = express.Router();

// Import Data
const pitchStats = require('../data/pitchingStats');

// Defines a route handler for the root URL ('/') using the HTTP GET method
// When a GET request is made to root URL, it responds with JSON pitchStats data
router.get('/', (req, res) => {
    res.json(pitchStats);
});

// Define route handler for requests with player ID parameter ('/:id') using HTTP GET method
// Retrieve pitching stats for specific player based on player ID in URL parameters
// If player stats found, respond with JSON pitching stats
// If player not found, responds with 404 status code and JSON object error message
router.get('/:id', function (req, res) {
    // Uses .find method on pitchStats array to compare whether playerId property in pitchStats array
    // matches with parameter Id extracted from URL. If condition 'true', .find method returns that element
    // and assigns it to plyrPitchStats. If no element satisfies condition, plyrPitchStats is undefined.
    const plyrPitchStats = pitchStats.find(function (pStats) {
        return pStats.playerId == req.params.id;
    });
    if (plyrPitchStats) {
        // Send JSON pitching stats
        res.json(plyrPitchStats);
    } else {
        // If no stats found, send 404 status error message
        res.status(404).json({ message: 'Player not found' });
    }
});

// Export router
module.exports = router;
