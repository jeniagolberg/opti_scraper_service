
const fs = require('fs');

module.exports = {
    write: function (data){
        fs.writeFile('movie-data.json', data, (err) => {
            if (err) throw err;
            console.log('Data written to file');
        });
    }
}