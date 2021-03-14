// express is web server package
const express = require('express');
const app = express();

// serve static files from public
app.use(express.static('public'));

// needed for post requests
app.use(express.json());

// endpoint for saving details
app.post('/savedetails', (req, res) => {
    const { name, posts } = req.body;

    console.log('Got request from ' + name);
});

app.listen(5000);
