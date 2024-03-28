import { converterPageUrl } from "../data/urls";
import BasePage from "./base.page";

class ConverterPage extends BasePage {
    private get currentDateLocator() {
        return $("//th[contains(@class,'th-first')]");
    }
    private get buyLabelLocator() {
        return $("//label[contains(@for,'buy')]");
    }
    private get enterCurrencyFieldLocator() {
        return $("//input[@id='amount-in']");
    }
    private get currencySelectLocator() {
        return $("//select[contains(@name,'currency-in')]");
    }
    private get currencyInBYNLocator() {
        return $("//b[contains(@class,'js-cur-result')]");
    }
    private get exchengeRateEURLocator() {
        return $("(//b[contains(text(),'EUR')]/ancestor::tr[contains(@class,'tr-main')]/td/p[contains(@class,'value')]/b)[2]");
    }

    private getCurrencyTitleLocator(currency: string) {
        return $("(//table[contains(@class,'b-currency-table__best')]//b[contains(text(),'{0}')])[1]".replace("{0}", currency));
    }


    async getCurrentDate(): Promise<string> {
        return (await this.currentDateLocator.getText()).trim();
    }

    async checkTitleCurrency(currency: string) {
        const currencyTitle: string = (await this.getCurrencyTitleLocator(currency).getText()).trim();

        expect(currencyTitle).toContain(currency);
    }

    async pressBuyLabel() {
        await this.buyLabelLocator.click();
    }
    
    async fillCyrrencyField(currencyCount: string | number) {
        await this.enterCurrencyFieldLocator.setValue(currencyCount);
    }

    async checkStandartCurrencyValueInFIeld(standartValueField) {
        expect(await this.enterCurrencyFieldLocator).toHaveValue(standartValueField);
    }

    async selectACurrency(currency: string) {
        await this.currencySelectLocator.selectByVisibleText(currency);
    }

    async getSummCurrencyInByn(): Promise<number> {
        return +((await this.currencyInBYNLocator.getText()).trim().replace(",", "."));
    }

    async getExChangeRateEur(): Promise<number> {
        return +((await this.exchengeRateEURLocator.getText()).trim().replace(",", "."))
    }
}

export default new ConverterPage(converterPageUrl)