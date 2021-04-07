const path = require('path');
const express = require('express');

const app = express();
const port = process.env.PORT || 3000; //heroku or local

// Define paths for Express config
const publicDirPath = path.join(__dirname, '..', 'public');

// Setup static dir to serve
app.use(express.static(publicDirPath));

// route all routes to the index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(publicDirPath, 'index.html'));
});

app.listen(port, () => console.log(`Web server is up on ${port}`));
