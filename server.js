const express = require('express');
const path = require('path')
const pngImageFactory = require('./micr-to-png'); // gonna make you sweat!

const app = express();

const port = process.env.PORT || 3031;

const defaultRoutingNumber = '121000248';    // use this default if no routing number is provided
const defaultAccountNumber = '4942600000';  // use this default if no account number is provided

app.get('/api/rcp-solutions/micr-gen', (req, res) => {
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

app.get('/api/rcp-solutions/logo', (req, res) => {
    const imagePath = path.join(__dirname, 'images', 'company_watermark.png');

    fs.readFile(imagePath, (err, data) => {
        if (err) {
          console.error(err);
          return res.status(500).send('Error loading image');
        }
    
        res.writeHead(200, { 'Content-Type': 'image/png' });
        res.end(data);
      });
});

app.get('/api/rcp-solutions/sig', (req, res) => {
    const imagePath = path.join(__dirname, 'images', 'new_check_signature.png');

    fs.readFile(imagePath, (err, data) => {
        if (err) {
          console.error(err);
          return res.status(500).send('Error loading image');
        }
    
        res.writeHead(200, { 'Content-Type': 'image/png' });
        res.end(data);
      });
});


app.listen(port, () => {
    console.log(`MICR line image factory is running on port ${port}.`);
});

module.exports = app;

