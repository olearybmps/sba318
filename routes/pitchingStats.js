const express = require('express');
const router = express.Router();
const pitchStats = require('../data/pitchingStats');

router.get('/', (req, res) => {
    res.json(pitchStats);
});

router.get('/:id', function (req, res) {
    const plyrPitchStats = pitchStats.find(function (pStats) {
        return pStats.playerId == req.params.id;
    });
    if (plyrPitchStats) {
        res.json(plyrPitchStats);
    } else {
        res.status(404).json({ message: 'Player not found' });
    }
});

module.exports = router;
