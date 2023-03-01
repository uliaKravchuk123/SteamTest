
const Page = require('./steam.page');

class NewTrending extends Page{

    get trendingGames() {
        return $('div.facetedbrowse\_FacetedBrowseItems\_NO\-\IP')
    }

    get selectYear() {
        return $('select#ageYear')
    }

    get submitAgeButton() {
        return $('a.view_product_page_btn')
    }

    get finalPrice() {
        return $('div.discount_final_price')
    }

    get finalDiscount() {
        return $('div.discount_pct')
    }

    async finalPriceDiscount(etalonPrice, etalonDiscount) {
        //вычисляем финальную цену 
        let finalPrice = 0;
        if(await this.finalPrice.isExisting() && await this.finalPrice.getText() !== "Free To Play") {
            let finalPriceDollar = await this.finalPrice.getText();
            finalPrice = parseFloat(finalPriceDollar.replace('$', ''))
        } 

        //вычисляем финальную скидку
        let finalDiscount = 0;
        if(await this.finalDiscount.isExisting()) {
            finalDiscount = parseFloat(await this.finalDiscount.getText());
        }

        let finalPriceDiscount = {};
        finalPriceDiscount.price = finalPrice;
        finalPriceDiscount.discount = finalDiscount;  

        return finalPriceDiscount;
    }

    async openGame(gameLink) {
        await gameLink.click();
        if ((await browser.getUrl()).includes('https://store.steampowered.com/agecheck/app')) {
            await this.selectYear.selectByVisibleText('1990')
            await this.submitAgeButton.click()
        }
    }

    async maxDiscountPriceGame() {

        await browser.scroll(0, 9000)
        let games = await this.trendingGames
        await games.waitForExist({ timeout: 10000 })
        await browser.pause(4000)
        let trendingGamesList = await this.trendingGames.$$('div.salepreviewwidgets\_SaleItemBrowserRow\_y9MSd')

        let maximumGameLink = "";
        let maximumGameDiscount = 0;
        let maximumGamePrice = 0;

        let currentGameLink = "";
        let currentGameDiscount = 0;
        let currentGamePrice = 0;

        for (let game of trendingGamesList) {
            //вычисляем линку на текущую игру
            currentGameLink = await game.$('img.salepreviewwidgets\_CapsuleImage\_cODQh')

            //вычисляем текущую цену 
            if(await game.$('div.salepreviewwidgets\_StoreSalePriceBox\_Wh0L8').isExisting() &&
               await game.$('div.salepreviewwidgets\_StoreSalePriceBox\_Wh0L8').getText() !== "Free To Play") 
               {
                let currentGamePriceDollar = await game.$('div.salepreviewwidgets\_StoreSalePriceBox\_Wh0L8').getText();
                currentGamePrice = currentGamePriceDollar.replace('$', '')
            } else {
                currentGamePrice = 0; 
            }

            //вычисляем текущую скидку и все максимальное 
            if(await game.$('div.salepreviewwidgets\_StoreSaleDiscountBox\_2fpFv').isExisting()) {
                currentGameDiscount = parseFloat(await game.$('div.salepreviewwidgets\_StoreSaleDiscountBox\_2fpFv').getText());
                if(currentGameDiscount <= maximumGameDiscount) {
                    maximumGameDiscount = currentGameDiscount;
                    maximumGamePrice = currentGamePrice;
                    maximumGameLink = currentGameLink;
                } else if (maximumGameDiscount == 0) {
                    if(currentGamePrice >= maximumGamePrice) {
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

module.exports = new NewTrending()