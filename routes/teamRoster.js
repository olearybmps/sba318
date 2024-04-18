const express = require('express');
const router = express.Router();
const { teamRoster } = require('../data/teamRoster');

router.get('/', (req, res) => {
    res.json(teamRoster);
});

router.get('/:id', function (req, res) {
    const player = teamRoster.find(function (p) {
        return p.id == req.params.id;
    });
    if (player) {
        res.json(player);
    } else {
        res.status(404).json({ message: 'Player not found' });
    }
});

module.exports = router;
