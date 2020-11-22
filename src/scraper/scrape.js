
const {extract, crawl, save} = require('./rules/index');
const puppeteer = require('puppeteer');

const start_urls = 
`https://www.imdb.com/title/tt0451279,
https://www.imdb.com/title/tt0114369,
https://www.imdb.com/title/tt0120815,
https://www.imdb.com/title/tt0103064,
http://www.imdb.com/title/tt0078748,
https://www.imdb.com/title/tt0032553,
https://www.imdb.com/title/tt7286456,
https://www.imdb.com/title/tt4633694,
https://www.imdb.com/title/tt0114709,
https://www.imdb.com/title/tt0119217,
https://www.imdb.com/title/tt0211915,
https://www.imdb.com/title/tt0056592,
https://www.imdb.com/title/tt0095016,
http://www.imdb.com/title/tt0468569,
https://www.imdb.com/title/tt0050083,
https://www.imdb.com/title/tt0110912,
https://www.imdb.com/title/tt0080684,
https://www.imdb.com/title/tt0133093,
https://www.imdb.com/title/tt0111161/,
https://www.imdb.com/title/tt0268978,
https://www.imdb.com/title/tt3315342,
https://www.imdb.com/title/tt0117731/,
https://www.imdb.com/title/tt2096673/,
imdb.com/title/tt0092099,
http://www.imdb.com/title/tt0317219,
http://www.imdb.com/title/tt1306980,
http://www.imdb.com/title/tt0110357,
https://www.imdb.com/title/tt0080179,
https://www.imdb.com/title/tt0093773,
https://www.imdb.com/title/tt0087928`

var scrapeController = async function(req,res,next){

    // if(!req.headers.start_urls.length){
    //     req.startUrls = [req.startUrls]
    // }

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    run(page,start_urls, 1);
    res.status(200);
    res.send('crawling started!')
}

var run = async function(page,links, requiredDepth){

    for(const link of links.split(',\n')){
        console.log(link)
        let currentLink = link;
        do {
            try {
                await page.goto(currentLink);
                let data = await extract(page);
                await save(data);
            } catch (err){
               console.log(err)
            }
        } while (crawl(requiredDepth--,page ,(newlink) => currentLink = newlink));
    }

    //TODO: send an event to notify that the crawling has ended and the data is ready.
}

module.exports = scrapeController