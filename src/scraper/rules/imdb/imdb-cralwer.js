const localSave = require('./../../../db/index').save;
const logError = console.error;

const FAILED_RETRIVAL_MSG = "No Record";


const serializeBudget = rawText => rawText ? rawText.split(' ')[0].split(':')[1] : FAILED_RETRIVAL_MSG

const serializeCwg = rawText => rawText ? rawText.split(':')[1] : FAILED_RETRIVAL_MSG;

const serializeRuntime = rawText => rawText ? rawText.split(':')[1] : FAILED_RETRIVAL_MSG;

const serializeReleaseDate = rawText => {

    if(rawText) {
        let day = rawText.match(/ \d{1,2} /)[0].replace(/ /g, '')
        let month = rawText.match(/\s(?:January|February|March|April|May|June|July|August|September|October|November|December)\b/)[0].replace(/ /g, '');
        let year = rawText.match(/\s*\d{4}/)[0].replace(/ /g, '')

        return {day,month,year};
    } else {
        return FAILED_RETRIVAL_MSG;
    }
}

const serializeGenres = rawText => rawText ? rawText.split(":")[1]
                                            .replace(/[ `~!@#$%^&*()_|+\=?;:'",.<>\{\}\[\]\\\/]/gi, "") : FAILED_RETRIVAL_MSG;

const getContext = (article,context) => article.split('\n').filter(ele => ele.startsWith(context))[0]

// extracts data for : budget, realese date, Runtime, Cumulative Worldwide Gross / Generes
const getArticleData = async (element, xpath) => {
    try {
        let articleElement = (await element.$x(xpath))[0];
        let text =  await element.evaluate(el => el.innerText, articleElement)
        return text;
    } catch (err) {
        logError(`Error on text retrival by article,\n${xpath}\n${err}`);
    }
}   

//extarcts data for : full movie name and rating 
const getDataByAncestors = async (element, ancestors) => {
    try{
        return await element.$eval(ancestors, el => el.innerText);
    } catch (err) {
        logError(`Error on text retrival by ancestors,\n${ancestors}, \n${err}`)
    }
}

const extractData = async (page, id) => {
    
    let detailsText = await getArticleData(page, '//div[@id="titleDetails"]');
    //details article
    let budget = serializeBudget(getContext(detailsText, "Budget:"));
    let cwg = serializeCwg(getContext(detailsText, "Cumulative Worldwide Gross:"));
    let releaseDate = serializeReleaseDate(getContext(detailsText, "Release Date:"));
    let runtime = serializeRuntime(getContext(detailsText, "Runtime:"));

    //title data
    let fullName = await getDataByAncestors(page,[".title_bar_wrapper .title_wrapper h1"]);
    let rating = await getDataByAncestors(page, [".title_bar_wrapper .ratingValue"]);


    //genres
    let storyLineText = await getArticleData(page, '//div[@id="titleStoryLine"]');
    let genres = await serializeGenres(getContext(storyLineText, "Genres:"));

    return {budget,cwg,releaseDate,runtime,fullName,rating,genres,id}
}


module.exports = { 
    /**
     * extracts required data from a single page
     */
    extractImdbData: async function(page, id) {
        try{
            return await extractData(page, id);
        } catch (err){
            logError(err)
        }
    },
    /**
     *  returns the next link to extract data from(when its from the page)
     *  if false then no crawling is neseccery.
     *  currently returns false since for now we crawl a list of given links.
    */
    goToNextPage: async function(depth, driver, setNext) { 
        return false;
    },
    /**
     * responsible for saving the data
     */
    save: async function(data){
        try {
        await localSave(data);
        } catch (err){
            logError(err)
        }
    }
}