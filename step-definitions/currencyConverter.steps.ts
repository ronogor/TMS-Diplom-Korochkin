import { When, Then } from '@wdio/cucumber-framework';
import MainPage from '../pageObjects/main.page';
import { expect } from '@wdio/globals';
import ConverterPage from '../pageObjects/converter.page';
import { converterPageUrl } from '../data/urls';
import { currentDayAndMonth } from '../helpers/date';
import { randomTextString } from '../data/constants';
import randomNumber from '../helpers/randomNumber';


When(/I will click on the link with the dollar exchange rate on the main page/, async () => {
    await MainPage.openConverterPage();
});

Then(/I see converter page is open, today's date is displayed, the exchange rate sections for (.*), (.*), (.*)/, 
    async (usd: string, eur: string, rub: string) => {
        const currentUrl: string = await ConverterPage.checkUrl();
        const currentDate: string = await ConverterPage.getCurrentDate();
        await ConverterPage.checkTitleCurrency(usd);
        await ConverterPage.checkTitleCurrency(eur);
        await ConverterPage.checkTitleCurrency(rub);
        
        expect(currentUrl).toEqual(converterPageUrl);
        expect(currentDate).toEqual(currentDayAndMonth());
});

When(/I will click the "Купить" button in the converter/, async () => {
    await ConverterPage.pressBuyLabel();
});

When(/Try to enter text in the converter field/, async () => {
    await ConverterPage.fillCyrrencyField(randomTextString);
});

Then(/I see the value of the field has not changed, the standard "(.*)" is displayed/, async (standartValueField: string) => {
    await ConverterPage.checkStandartCurrencyValueInFIeld(standartValueField);
});

let amountBeExchanged: number
When(/I will enter a value in the converter field/, async () => {
    amountBeExchanged = randomNumber();
    await ConverterPage.fillCyrrencyField(amountBeExchanged);
});

When(/Choose the (.*) currency/, async (currency: string) => {
    await ConverterPage.selectACurrency(currency);
});

Then(/The value in BYN is calculated in the converter on the right./, async () => {
    const summBynInConverter: number = await ConverterPage.getSummCurrencyInByn();
    const eurExchangeRate: number = await ConverterPage.getExChangeRateEur();
    const summBynAfterCheck: number = +(amountBeExchanged * eurExchangeRate).toFixed(3);

    expect(summBynInConverter).toBe(summBynAfterCheck);
});
