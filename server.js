const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// create an express app
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse application/json
app.use(bodyParser.json())

// Enable cors
app.use(cors());

// Configuring the database
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url)
.then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...');
    process.exit();
});

// define a simple route
app.get('/', (req, res) => {
    res.json({
        "message": "Welcome!"
    });
});

require('./app/routes/routes.js')(app);

// listen for requests
app.listen(3002, () => {
    console.log("Server is listening on port 3002");
});