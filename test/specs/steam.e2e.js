const SteamPage = require('../pages/steamHome.page')
const NewTrending = require('../pages/steamActions.page');
const SetupGame = require('../pages/downloadGame.page');
//const { googleResults } = require('../pages/googleResults.page');


describe('First test', () => {

    it('1. Зайти на https://store.steampowered.com/ ', async () => {
        await SteamPage.open();
    })

    it('2. Открыть Action категорию в новом окне ', async () => {
        await SteamPage.openActionCategory()
        await browser.switchWindow('https://store.steampowered.com/category/action/')
        await expect(browser).toHaveUrl('https://store.steampowered.com/category/action/')
    })

    it('3. Выбрать игру с максимальной скидкой или максимальной ценой ', async () => {

        let maxDiscountPrice = await NewTrending.maxDiscountPriceGame();
        console.log("Game has - " + maxDiscountPrice.price + " - " + maxDiscountPrice.discount)

        await NewTrending.openGame(maxDiscountPrice.link)
        await browser.switchWindow('https://store.steampowered.com/app/')
        await expect(browser).toHaveUrlContaining('https://store.steampowered.com/app/')

        let finalDiscountPrice = await NewTrending.finalPriceDiscount();

        expect(+maxDiscountPrice.price).toEqual(+finalDiscountPrice.price);
        expect(+maxDiscountPrice.discount).toEqual(+finalDiscountPrice.discount);

    })

    it('4. Cкачиваем игру ', async () => {
        await SetupGame.installGame();
        await browser.switchWindow('https://store.steampowered.com/about/')
        await expect(browser).toHaveUrl('https://store.steampowered.com/about/')
        await SetupGame.installGameWindows();
        await browser.pause(10000)
    })

})


//npx wdio run .\wdio.conf.js --spec .\test\specs\steam.e2e.js