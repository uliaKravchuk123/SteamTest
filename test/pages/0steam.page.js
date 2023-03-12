module.exports = class Page {
    /**
    * Opens a sub page of the page
    * @param path path of the sub page (e.g. /path/to/page.html)
    */
    async open(path = "") {
        browser.url(`https://store.steampowered.com/${path}`)
        await expect(browser).toHaveUrl('https://store.steampowered.com/')
    }
}
