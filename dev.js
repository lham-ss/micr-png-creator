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

    // Use the E13B font
    ctx.font = '48pt "MICR E13B"';
    ctx.fillText('C0008675309C A121000999   49426000000C', 10, 600, 4000);

    // Create the png file
    const buffer = canvas.toBuffer('image/png');

    fs.writeFileSync('./results.png', buffer);

    console.log('Image generated!');

};

main('185940854', '454545', '45065');