const SteamHome = require('../pages/1steamHome.page')
const SteamCategory = require('../pages/2steamCategory.page');
const AgeCheck = require('../pages/3ageCheck.page');
const FinalGame = require('../pages/4finalGame.page');
const InstallSteam = require('../pages/5installSteam.page');
const fsPromises = require('fs').promises;


describe('First test', () => {

    it('1. Зайти на https://store.steampowered.com/ ', async () => {
        await SteamHome.open();
    })

    it('2. Открыть категорию в новом окне ', async () => {
        await SteamHome.openCategory('Action')
        await expect(browser).toHaveUrl('https://store.steampowered.com/category/action/')
    })

    it('3. Выбрать игру с максимальной скидкой или максимальной ценой ', async () => {
        let maxDiscountPrice = await SteamCategory.maxDiscountPriceGame();

        await maxDiscountPrice.link.click();
        if ((await browser.getUrl()).includes('https://store.steampowered.com/agecheck/app')) {
            await AgeCheck.submitAge();
        }
        await browser.switchWindow('https://store.steampowered.com/app/')
        await expect(browser).toHaveUrlContaining('https://store.steampowered.com/app/')

        let finalDiscountPrice = await FinalGame.finalPriceDiscount();

        expect(+maxDiscountPrice.price).toEqual(+finalDiscountPrice.price);
        expect(+maxDiscountPrice.discount).toEqual(+finalDiscountPrice.discount);
    })

    it('4. Cкачиваем игру ', async () => {
        await SteamHome.clickInstallButton();
        await browser.switchWindow('https://store.steampowered.com/about/')
        await expect(browser).toHaveUrl('https://store.steampowered.com/about/')
        await InstallSteam.clickInstallWindowsButton();
        await browser.pause(4000)
        try {
            await fsPromises.readFile('./SteamSetup.exe');
        } finally {
            await fsPromises.unlink('./SteamSetup.exe');
        }
    })

})


//npx wdio run .\wdio.conf.js --spec .\test\specs\steam.e2e.js