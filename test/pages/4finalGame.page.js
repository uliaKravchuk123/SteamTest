const Page = require('./0steam.page');

class FinalGame extends Page {

    get finalPriceLabel() {
        return $('div.discount_final_price')
    }

    get finalDiscountLabel() {
        return $('div.discount_pct')
    }

    async finalPriceDiscount() {
        //вычисляем финальную цену 
        let finalPrice = 0;
        if (await this.finalPriceLabel.isExisting() && await this.finalPriceLabel.getText() !== "Free To Play") {
            let finalPriceDollar = await this.finalPriceLabel.getText();
            finalPrice = parseFloat(finalPriceDollar.replace('$', ''))
        }

        //вычисляем финальную скидку
        let finalDiscount = 0;
        if (await this.finalDiscountLabel.isExisting()) {
            finalDiscount = parseFloat(await this.finalDiscountLabel.getText());
        }

        let finalPriceDiscount = {};
        finalPriceDiscount.price = finalPrice;
        finalPriceDiscount.discount = finalDiscount;

        return finalPriceDiscount;
    }

}

module.exports = new FinalGame()