const express = require('express');
const router = express.Router();
const schedule = require('../data/teamSchedule');
const teamSchedule = require('../data/teamSchedule');

router.get('/', (req, res) => {
    res.json(schedule);
});

// Get all games
router.get('/:teamName', function (req, res) {
    const teamName = decodeURIComponent(req.params.teamName);
    const myTeamGames = schedule.filter(function (game) {
        return game.homeTeam === teamName || game.awayTeam === teamName;
    });

    if (myTeamGames.length > 0) {
        res.json(myTeamGames);
    } else {
        res.status(404).json({
            message: 'No games found for the specified team',
        });
    }
});

// Just home or just away
router.get('/:teamName/:homeOrAway', function (req, res) {
    const teamName = decodeURIComponent(req.params.teamName);
    const homeAway = req.params.homeOrAway.toLowerCase();
    const myTeamGames = schedule.filter(function (game) {
        if (homeAway === 'away'){
            return game.awayTeam === teamName;
        } else {
            return game.homeTeam === teamName;
        }
    });

    if (myTeamGames.length > 0) {
        res.json(myTeamGames);
    } else {
        res.status(404).json({
            message: 'No games found for the specified team',
        });
    }
});


module.exports = router;
