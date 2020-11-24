
const {extract, crawl, save} = require('./rules/index');
const puppeteer = require('puppeteer');

const scrapeController = async function(req,res,next){

    let urls;
    if(!req.headers.start_urls){
        urls = require('./planB').loadLoaclySavedUrls();
    }else{
        urls = req.headers.start_urls
    }

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    res.status(200);
    res.send('crawling started!');
    await run(page, parseLinksString(urls), 1);
    console.log("done!")
    res.end();
}

const addHttPrefix = (link) => `https://www.${link}`;

const parseLinksString = (rawLinks) => rawLinks.replace(/[ \n]/gi, "").split(',');

const run = async function(page, splitedLinks, requiredDepth){
    for(let link of splitedLinks){
        if(!link.startsWith('https://www') && !link.startsWith('http://www')){
            link = addHttPrefix(link);
        }

        let currentLink = link;
        let imdbId = link.split('/')[link.split('/').length - 1];
        do {
            try {
                await page.goto(currentLink);
                let data = await extract(page, {id: imdbId});
                await save(data);
            } catch (err){
               console.log(err)
            }
        } while (await crawl(requiredDepth--,page ,(newlink) => currentLink = newlink));
    }
}

module.exports = scrapeController