const express = require('express');
const router = express.Router();
const schedule = require('../data/teamSchedule');

// Filter request by date: /api/schedule?date=04-01
// Filter request by homeTeam: /api/schedule?homeTeam=Fire Dragons
// Filter request by awayTeam: /api/schedule?awayTeam=Fire Dragons
// Filter by combining: /api/schedule?date=04-01&homeTeam=Fire Dragons

router.get('/', (req, res) => {
    const { date, homeTeam, awayTeam } = req.query;
    let filteredSchedule = schedule;

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

    res.json(filteredSchedule);
});

// Get all games by team
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
        if (homeAway === 'away') {
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
