// lham@ss.io

const express = require('express');
const { createCanvas, registerFont } = require('canvas');
const fs = require('fs');
const path = require('path');

// Register the font
try {
    registerFont('./fonts/micr-e13b.ttf', { family: 'E13B' });
} catch(e) {
    console.log(e)
}

const app = express();

const main = (checkNumber, routingNumber, accountNumber) => {
    const canvas = createCanvas(4000, 1000);
    const ctx = canvas.getContext('2d');

    ctx.font = '48pt "MICR E13B"';

    ctx.fillText(`C${checkNumber}C A${routingNumber}   ${accountNumber}C`, 10, 600, 4000);

    const buffer = canvas.toBuffer('image/png');

    fs.writeFileSync('./results.png', buffer);

    console.log('Image generated!');

};

main('8675309', '12100002345', '49426000000');