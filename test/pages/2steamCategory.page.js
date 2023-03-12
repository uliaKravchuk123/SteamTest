const Page = require('./0steam.page');

class SteamCategory extends Page {

    get facetedBrowseItems() {
        return $('div.facetedbrowse\_FacetedBrowseItems\_NO\-\IP')
    }

    async maxDiscountPriceGame() {

        await browser.scroll(0, 9000)
        await browser.pause(4000)
        let gamesList = await this.facetedBrowseItems.$$('div.salepreviewwidgets\_SaleItemBrowserRow\_y9MSd')

        let maximumGameLink = "";
        let maximumGameDiscount = 0;
        let maximumGamePrice = 0;

        let currentGameLink = "";
        let currentGameDiscount = 0;
        let currentGamePrice = 0;

        for (let game of gamesList) {
            //вычисляем линку на текущую игру
            currentGameLink = await game.$('img.salepreviewwidgets\_CapsuleImage\_cODQh')

            //вычисляем текущую цену 
            if (await game.$('div.salepreviewwidgets\_StoreSalePriceBox\_Wh0L8').isExisting() &&
                await game.$('div.salepreviewwidgets\_StoreSalePriceBox\_Wh0L8').getText() !== "Free To Play") {
                let currentGamePriceDollar = await game.$('div.salepreviewwidgets\_StoreSalePriceBox\_Wh0L8').getText();
                currentGamePrice = currentGamePriceDollar.replace('$', '')
            } else {
                currentGamePrice = 0;
            }

            //вычисляем текущую скидку и все максимальное 
            if (await game.$('div.salepreviewwidgets\_StoreSaleDiscountBox\_2fpFv').isExisting()) {
                currentGameDiscount = parseFloat(await game.$('div.salepreviewwidgets\_StoreSaleDiscountBox\_2fpFv').getText());
                if (currentGameDiscount <= maximumGameDiscount) {
                    maximumGameDiscount = currentGameDiscount;
                    maximumGamePrice = currentGamePrice;
                    maximumGameLink = currentGameLink;
                } else if (maximumGameDiscount === 0) {
                    if (currentGamePrice >= maximumGamePrice) {
                        maximumGamePrice = currentGamePrice;
                        maximumGameLink = currentGameLink;
                    }
                }
            }
        }
        let maxGame = {};
        maxGame.link = maximumGameLink;
        maxGame.price = maximumGamePrice;
        maxGame.discount = maximumGameDiscount;

        return maxGame;
    }
}

module.exports = new SteamCategory()