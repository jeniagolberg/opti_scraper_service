
const extract = require('./imdb/imdb-cralwer').extractImdbData;
const crawl = require('./imdb/imdb-cralwer').goToNextPage;
const save = require('./imdb/imdb-cralwer').save;
module.exports = { 
    extract,
    crawl,
    save,
}