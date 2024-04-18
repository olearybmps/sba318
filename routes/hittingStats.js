const express = require('express');
const router = express.Router();
const hitStats = require('../data/hittingStats');

router.get('/', (req, res) => {
    res.json(hitStats);
});

router.get('/:id', function (req, res) {
    const plyrHitStats = hitStats.find(function (pStats) {
        return pStats.playerId == req.params.id;
    });
    if (plyrHitStats) {
        res.json(plyrHitStats);
    } else {
        res.status(404).json({ message: 'Player not found' });
    }
});

module.exports = router;
