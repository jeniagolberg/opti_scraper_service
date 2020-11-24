
const fs = require('fs');

async function writeToFile(data) {

    
    await fs.readFile('movie-data.json',async (err, rawdata) => {
        let currentJson = JSON.parse(rawdata),
            toWrite = {};
        if(Object.keys(currentJson).length){
            toWrite = {...currentJson}
        }       
            toWrite[data.id] = data;
        try {
            await fs.writeFile('movie-data.json', JSON.stringify(toWrite), (err) => {
                if (err) throw err;
                console.log('Data written to file');
            });
        }catch (err) {
            console.error(`Error while writing to local db, ${err}`)
        }
    })
 }
 

module.exports = {
    writeToFile
}