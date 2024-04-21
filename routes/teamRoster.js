 // Import Express Framework
const express = require('express');

// Create Router
const router = express.Router();

// Import Data
const { teamRoster } = require('../data/teamRoster');


//  Sets up routes to handle CRUD operations (Create, Read, Update, Delete) on team roster
// ***************************************************************************************
// Define route for the root URL ('/') using the route() method.
// Handle GET requests by responding with the entire teamRoster array as JSON
// Handle POST requests by adding new player to teamRoster array if request body contains required data (name and age).
router
    // Route pattern
    .route('/')
    .get((req, res) => {
        // Send JSON roster
        res.json(teamRoster);
    })
    .post((req, res) => {
        // Check if request body contains name AND age
        if (req.body.name && req.body.age) {
            // Checking if player with same name already exists
            // Utilizes .find method on the teamRoster array taking callback function as argument. 
            // Executed for each player object in teamRoster array
            // For each player object, check if name property matches name in req.body.name
            // If player with same name found (returns truthy value), condition evaluates true
            if (teamRoster.find((player) => player.name === req.body.name)) {
                res.json({ error: 'Name Already Exists' });
                return;
            }
            // Create and assign new player object
            const teamMate = {
                // Assign unique id: length of array plus one
                id: teamRoster[teamRoster.length - 1].id + 1,
                name: req.body.name,
                age: req.body.age,
            };
            // Add new player to teamRoster array
            teamRoster.push(teamMate);
            // Respond with new added player
            res.json(teamRoster[teamRoster.length - 1]);
        } else {
            // Respond with error if name and age not provided in request body
            res.json({ error: 'Insufficient Data' });
        }
    });

// Define route for requests with player ID parameter ('/:id') using the route() method
// Handle GET requests by finding and responding with player object that matches provided ID
// Handle PATCH requests by updating player object with provided ID using data from request body
// Handle DELETE requests by finding and removing player object with provided ID from teamRoster array
router
    // Route pattern
    .route('/:id')
    .get(function (req, res) {
        // Uses find method to iterate array and find player with matching ID
        const player = teamRoster.find(function (p) {
            return p.id == req.params.id;
        });
        // If player found (truthy), respond with JSON player
        if (player) {
            res.json(player);
        } else {
            //  If no player found (falsy), respond with 404 status and JSON error message
            res.status(404).json({ message: 'Player not found' });
        }
    })
    .patch((req, res) => {
        // Uses find method to iterate array and find player with matching ID
        const player = teamRoster.find((p) => p.id == req.params.id);
        // If player found (truthy), update player info
        if (player) {
            // For each property, update property in player object with value from request body
            for (const key in req.body) {
                player[key] = req.body[key];
            }
            // Responds with JSON of player
            res.json(player);
        } else {
            // If not found, send 404 status error message
            res.status(404).json({ message: 'Player not found' });
        }
    })
    .delete((req, res) => {
        // log delete request
        console.log('Delete route called with id:', req.params.id);
        // Use .findIndex method to iterate the array and find the index of player with the matching ID
        const playerIndex = teamRoster.findIndex((p) => p.id == req.params.id);
        // Check if player with given ID is found in teamRoster array. If found (playerIndex NOT equal to -1), delete player
        if (playerIndex !== -1) {
            // Use splice method remove player from teamRoster array
            const deletedPlayer = teamRoster.splice(playerIndex, 1)[0];
            // Send JSON roster
            res.json(deletedPlayer);
        } else {
            // If not found, send 404 status error message
            res.status(404).json({ message: 'Player not found' });
        }
    });

// Export router    
module.exports = router;
