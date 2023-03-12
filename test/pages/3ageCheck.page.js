const Page = require('./0steam.page');

class AgeCheck extends Page {

    get ageYearInput() {
        return $('select#ageYear')
    }

    get submitAgeButton() {
        return $('a.view_product_page_btn')
    }

    async submitAge() {
        await this.ageYearInput.selectByVisibleText('1990')
        await this.submitAgeButton.click()
    }

}

module.exports = new AgeCheck()
