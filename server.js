const express = require('express');

const pngImageFactory = require('./micr-to-png'); // gonna make you sweat!

const app = express();

const port = process.env.PORT || 3030;

const defaultRoutingNumber = '121000248';    // use this default if no routing number is provided
const defaultAccountNumber = '54942657528';  // use this default if no account number is provided

app.get('/micr-gen', (req, res) => {
    let { checkNumber, routingNumber = defaultRoutingNumber, accountNumber = defaultAccountNumber } = req.query;

    if (!checkNumber || !routingNumber || !accountNumber) {

        res.status(400).send('Missing required parameters.');

    } else {
        let buf = pngImageFactory.generateMICRLinePng(checkNumber, routingNumber, accountNumber);

        console.log('--- Generated MICR line image for check #: ', checkNumber);

        res.set('Content-Type', 'image/png');

        res.send(buf);
    }
});

app.listen(port, () => {
    console.log(`MICR line image factory is running on port ${port}.`);
});

module.exports = app;

