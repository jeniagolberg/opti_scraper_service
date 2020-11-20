
const express = require('express')
const app = express();

const scrapeController = require('./scraper/scrape')

const PORT = process.env.PORT || "3001";

app.get('/scrape', scrapeController);


app.listen(PORT, () => {
    console.log(`server listening on port: ${PORT}`);
})