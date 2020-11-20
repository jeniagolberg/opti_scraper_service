
const {extract, crawl, save} = require('./rules/index');
const {Builder} = require('selenium-webdriver');


var scrapeController = async function(req,res,next){

    if(!req.headers.start_urls.length){
        req.startUrls = [req.startUrls]
    }

    const driver = await new Builder().forBrowser('chrome').build();

    run(driver,req.headers.start_urls, req.headers.crawl_depth);
    res.status(200);
    res.send('crawling started!')
}

var run = async function(driver,links, requiredDepth){

    for(const link of links.split(',')){
        console.log(link)
        let currentLink = link;
        do {
            try {
                await driver.get(currentLink);
                //await save(await extract(driver));
            } catch (err){
               
            }
        } while (crawl(requiredDepth--,driver ,(newlink) => currentLink = newlink));
    }

    //TODO: send an event to notify that the crawling has ended and the data is ready.
}

module.exports = scrapeController