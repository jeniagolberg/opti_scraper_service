const dbService = require('./../../../db')
module.exports = { 
    
    /**
     * extracts required data from a single page
     */
    extractImdbData: function(driver) {
        /*
        todo: using driver.findElements to get the relevent data
        use save callback to write to db
        */
    },

    /**
     *  returns the next link to extract data from(when its from the page)
     *  if false then no crawling is neseccery.
     *  currently returns false since for now we crawl a list of given links.
    */
    goToNextPage: function(depth,driver, setNext) { 
        return false
    },
    /**
     * responsible for saving the data
     */
    save: function(data){
        dbService.write(data)
    }
}