// Import environment variables
require('dotenv').config();

// Import express
const express = require('express');

// Create application object
const app = express();

// Define port variable from the environment variable
const port = process.env.PORT || 4000;


app.get('/', (req, res) => {
    res.send('Brians World!');
});


// Server Listener
app.listen(port, () => {
    console.log(`Listening port on ${port}`);
});
