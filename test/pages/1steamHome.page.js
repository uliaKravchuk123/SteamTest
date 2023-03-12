const Page = require('./0steam.page');

class SteamHome extends Page {

    get navigationBar() {
        return $$('a.pulldown_desktop')
    }

    get installButton() {
        return $('a.header\_installsteam\_btn\_content')
    }

    async openCategory(category) {
        await this.navigationBar[2].waitForDisplayed({ timeout: 10000 });
        await this.navigationBar[2].moveTo();
        const categorySelector = '=' + category;
        await $(categorySelector).click();
    }

    async clickInstallButton() {
        await this.installButton.click()
    }


}

module.exports = new SteamHome()
