// TODO: express server microservice
// lham@ss.io

const express = require('express');
const app = express();

const port = process.env.PORT || 5050;

app.get('/', (req, res) => {
    res.send('Yes, of course it is working...');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

module.exports = app;

