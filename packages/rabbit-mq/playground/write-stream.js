const fs = require('fs');
const path = require('path');

const file = fs.createWriteStream(path.join(__dirname, 'test.csv'));
file.destroy();