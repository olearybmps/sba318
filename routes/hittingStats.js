// Import Express Framework
const express = require('express');

// Create Router
const router = express.Router();

// Import Data
const hitStats = require('../data/hittingStats');

// Defines route handler for the root URL ('/') using HTTP GET method
// When GET request is made to the root URL responds with JSON hitStats data
router.get('/', (req, res) => {
    res.json(hitStats);
});

// Defines route handler for requests with player ID parameter ('/<playerId>') using HTTP GET method
// Retrieves hitting stats for specific player based on player ID in URL parameters
// If player stats found, respond with JSON player hitting stats
// If not found, respond with 404 status code and JSON object containing error message
router.get('/:id', function (req, res) {
    // Uses .find method on hitStats array to compare whether playerId property in hitStats array
    // matches with parameter Id extracted from URL. If condition 'true', .find method returns that element
    // and assigns it to plyrHitStats. If no element satisfies condition, plyrHitStats is undefined.
    const plyrHitStats = hitStats.find(function (pStats) {
        return pStats.playerId == req.params.id;
    });
    if (plyrHitStats) {
        // Send JSON hitting stats
        res.json(plyrHitStats);
    } else {
        // If no stats found, send 404 status error message
        res.status(404).json({ message: 'Player not found' });
    }
});

// Export router
module.exports = router;
