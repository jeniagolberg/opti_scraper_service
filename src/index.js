
const express = require('express')
const app = express();

const scrapeController = require('./scraper/scrape')

const PORT = process.env.PORT || "3001";

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
    console.log(`server listening on port: ${PORT}`);
})