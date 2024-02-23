const express = require('express');

const micrToImage = require('./micr-to-png');

const app = express();

const port = process.env.PORT || 3030;

const defaultRoutingNumber = '121000248';
//const defaultAccountNumber = '4942658782';
const defaultAccountNumber = '4942657528';

app.get('/micr-gen', (req, res) => {
    let checkNumber = req.query.checkNumber;
    
    let routingNumber = req.query.routingNumber;
    let accountNumber = req.query.accountNumber;

    if( !routingNumber ) routingNumber = defaultRoutingNumber;
    if( !accountNumber ) accountNumber = defaultAccountNumber;

    if (!checkNumber || !routingNumber || !accountNumber) {

        res.status(400).send('Missing required parameters.');

    } else {
        let buffer = micrToImage.generateMICRLinePNG(checkNumber, routingNumber, accountNumber);

        console.log('--- Generated MICR line image for check #: ', checkNumber);

        res.set('Content-Type', 'image/png');

        res.send(buffer);
    }
});

app.listen(port, () => {
    console.log(`MICR line image factory is running on port ${port}.`);
});

module.exports = app;

