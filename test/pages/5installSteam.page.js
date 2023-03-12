const Page = require('./0steam.page');

class InstallSteam extends Page {

    get installWindowsButton() {
        return $('.about_install_steam_link')
    }

    async clickInstallWindowsButton() {
        await this.installWindowsButton.click()
    }

}

module.exports = new InstallSteam()
