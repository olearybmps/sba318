 const express = require('express');
const router = express.Router();
const { teamRoster } = require('../data/teamRoster');

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

router
    .route('/:id')
    .get(function (req, res) {
        const player = teamRoster.find(function (p) {
            return p.id == req.params.id;
        });
        if (player) {
            res.json(player);
        } else {
            res.status(404).json({ message: 'Player not found' });
        }
    })
    .patch((req, res) => {
        const player = teamRoster.find((p) => p.id == req.params.id);
        if (player) {
            for (const key in req.body) {
                player[key] = req.body[key];
            }
            res.json(player);
        } else {
            res.status(404).json({ message: 'Player not found' });
        }
    })
    .delete((req, res) => {
        console.log('Delete route called with id:', req.params.id);
        const playerIndex = teamRoster.findIndex((p) => p.id == req.params.id);
        if (playerIndex !== -1) {
            const deletedPlayer = teamRoster.splice(playerIndex, 1)[0];
            res.json(deletedPlayer);
        } else {
            res.status(404).json({ message: 'Player not found' });
        }
    });

module.exports = router;
