
const extract = require('./imdb/imdb-cralwer').extractImdbData;
const crawl = require('./imdb/imdb-cralwer').goToNextPage
const save = require('./../../db/index').write;
module.exports = { 
    extract,
    crawl,
    save,
}