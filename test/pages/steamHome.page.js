const Page = require('./steam.page');

class SteamHome extends Page {

    get categoriesTab() {
        return $$('a.pulldown_desktop')
    }

    get actionCategory() {
        return $('//*[contains(@href,"https://store.steampowered.com/category/action/")]')
    }

    async openActionCategory() {
        await this.categoriesTab[2].moveTo();
        await this.actionCategory.waitForClickable({ timeout: 10000 });
        await this.actionCategory.click({ button: "middle"})
        
    }


}

module.exports = new SteamHome()
