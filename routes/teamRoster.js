 const express = require('express');
const router = express.Router();
const { teamRoster } = require('../data/teamRoster');

// router.get('/', (req, res) => {
//     res.json(teamRoster);
// });

router
    .route('/')
    .get((req, res) => {
        res.json(teamRoster);
    })
    .post((req, res) => {
        if (req.body.name && req.body.age) {
            if (teamRoster.find((player) => player.name === req.body.name)) {
                res.json({ error: 'Name Already Exists' });
                return;
            }
            const teamMate = {
                id: teamRoster[teamRoster.length - 1].id + 1,
                name: req.body.name,
                age: req.body.age,
            };
            teamRoster.push(teamMate);
            res.json(teamRoster[teamRoster.length - 1]);
        } else {
            res.json({ error: 'Insufficient Data' });
        }
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
