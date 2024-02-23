// lham@rcpsolutions

const { createCanvas, registerFont } = require('canvas');

const fs = require('fs');

const fontName = '18pt "MICR E13B"';

const loadFont = () => {
    try {
        registerFont('./fonts/micr-e13b.ttf', { family: 'E13B' });
    } catch(e) {
        console.log(e)
    }
}

const generateMICRLinePNG = (checkNumber, routingNumber, accountNumber) => {
    const canvas = createCanvas(700, 50);
    const ctx = canvas.getContext('2d');

    ctx.font = fontName

    ctx.fillText(`C${checkNumber}C A${routingNumber}A   ${accountNumber}C`, 10, 25, 700);

    return canvas.toBuffer('image/png');
};

const writePNG = (buffer) => {
    try {
        fs.writeFileSync('./results.png', buffer);

        console.log('PNG file written as results.png.');
    }
    catch(e) {
        console.log(e);
    }
}

const test = (checkNumber, routingNumber, accountNumber) => {
    const buffer = generateMICRLinePNG(checkNumber, routingNumber, accountNumber);

    writePNG(buffer);
}

/*
loadFont();
test('08675309', '121000248', '4942658782');
*/

module.exports = {
    loadFont,
    generateMICRLinePNG,
}

