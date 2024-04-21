// Import Express Framework
const express = require('express');

// Create Router
const router = express.Router();

// Import Data
const schedule = require('../data/teamSchedule');

// Filter request by date: /api/schedule?date=04-01
// Filter request by homeTeam: /api/schedule?homeTeam=Fire Dragons
// Filter request by awayTeam: /api/schedule?awayTeam=Fire Dragons
// Filter by combining: /api/schedule?date=04-01&homeTeam=Fire Dragons

// Defines route handler for the root URL ('/') using the HTTP GET method
router.get('/', (req, res) => {
    // Extract query parameters from request utilizing destructuring
    // Example: URL = /api/schedule?date=04-01&homeTeam=Fire%20Dragons,
    // then req.query { date: '04-01', homeTeam: 'Fire Dragons' }.
    const { date, homeTeam, awayTeam } = req.query;
    let filteredSchedule = schedule;

    // Filter schedule based on query parameters
    if (date) {
        filteredSchedule = filteredSchedule.filter(
            (game) => game.date === date
        );
    }

    if (homeTeam) {
        filteredSchedule = filteredSchedule.filter(
            (game) => game.homeTeam === homeTeam
        );
    }

    if (awayTeam) {
        filteredSchedule = filteredSchedule.filter(
            (game) => game.awayTeam === awayTeam
        );
    }

    // Send filtered schedule as JSON response
    res.json(filteredSchedule);
});

// Defines route handler for requests with a teamName parameter ('/:teamName') using HTTP GET method
router.get('/:teamName', function (req, res) {
    // Extract teamName parameter from request
    const teamName = decodeURIComponent(req.params.teamName);
    // Filter schedule for games by team
    const myTeamGames = schedule.filter(function (game) {
        return game.homeTeam === teamName || game.awayTeam === teamName;
    });

    // Send games for the specified team as JSON response
    if (myTeamGames.length > 0) {
        res.json(myTeamGames);
    } else {
        // If no games found, send 404 status error message
        res.status(404).json({
            message: 'No games found for the specified team',
        });
    }
});

// Define route handler for requests with both teamName and homeOrAway 
// parameters ('/:teamName/:homeOrAway') using HTTP GET method
router.get('/:teamName/:homeOrAway', function (req, res) {
    // Extract teamName and homeOrAway parameters from request
    const teamName = decodeURIComponent(req.params.teamName);
    const homeAway = req.params.homeOrAway.toLowerCase();

    // Filter schedule based on team and home/away status
    const myTeamGames = schedule.filter(function (game) {
        if (homeAway === 'away') {
            return game.awayTeam === teamName;
        } else {
            return game.homeTeam === teamName;
        }
    });

    // Send filtered games as JSON response
    if (myTeamGames.length > 0) {
        res.json(myTeamGames);
    } else {
        // If no games found, send 404 status error message
        res.status(404).json({
            message: 'No games found for the specified team',
        });
    }
});

// Export router
module.exports = router;
