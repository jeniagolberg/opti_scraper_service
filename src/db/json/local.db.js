
const fs = require('fs');

async function writeToFile(data) {
    try {
        await fs.writeFile('movie-data.json', data, (err) => {
            if (err) throw err;
            console.log('Data written to file');
        });
    }catch (err) {
        console.error(`Error while writing to local db, ${err}`)
    }
 }

module.exports = {
    writeToFile
}