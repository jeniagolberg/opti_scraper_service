
const express = require('express')
const app = express();
const cors = require('cors');
const scrapeController = require('./scraper/scrape')

const PORT = process.env.PORT || "3001";

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'content-type');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.options('*',cors())

app.get('/scrape', scrapeController);

app.get('/getMovieData', (req,res,next) => {
    try{
        res.status(200);
        res.send(require('./../movie-data.json'));
    } catch( err ){
        console.err(err)
        res.status(400)
        res.send('Error on fetching movie data from json')
    }
})

app.listen(PORT, () => {
    console.log(`scraper listening on port: ${PORT}`);
})