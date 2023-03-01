const Page = require('./steam.page');

class SteamSetup extends Page {

    get installButton() {
        return $('a.header\_installsteam\_btn\_content')
    }

    get installButtonWindows() {
        return $('a[href="https://cdn.cloudflare.steamstatic.com/client/installer/SteamSetup.exe"]')
    }

    async installGame() {
        await this.installButton.click() 
    }

    async installGameWindows() {
        await this.installButtonWindows.click() 
    }

}

module.exports = new SteamSetup()
