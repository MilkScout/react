const fs = require('fs');
const path = require('path');

const DIST_FOLDER = path.join(__dirname, 'dist');

fs.copyFileSync(path.join(__dirname, 'LICENSE'), path.join(DIST_FOLDER, 'LICENSE'));
fs.copyFileSync(path.join(__dirname, 'README.md'), path.join(DIST_FOLDER, 'README.md'));

const packageJSONKeys = [
    'name',
    'version',
    'main',
    'repository',
    'author',
    'license',
    'peerDependencies',
];

const packageJSON = Object.entries(JSON.parse(fs.readFileSync('package.json').toString()))
    .filter(([key]) => packageJSONKeys.indexOf(key) > -1)
    .reduce((prev, [key, value]) => ({...prev, [key]: value}), {});

fs.writeFileSync(path.join(DIST_FOLDER, 'package.json'), JSON.stringify(packageJSON, null, 2))
