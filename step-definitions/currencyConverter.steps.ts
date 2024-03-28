import { When, Then } from '@wdio/cucumber-framework';
import MainPage from '../pageObjects/main.page';
import { expect } from '@wdio/globals';
import ConverterPage from '../pageObjects/converter.page';
import { converterPageUrl } from '../data/urls';


When(/I will click on the link with the dollar exchange rate on the main page/, async () => {
    await MainPage.openConverterPage();
});

Then(/I see converter page is open, today's date is displayed, the exchange rate sections for USD, EUR, RUB/, async () => {
    const currentUrl: string = await ConverterPage.checkUrl();

    expect(currentUrl).toEqual(converterPageUrl);
});

When(/I will click the "Купить" button in the converter/, async () => {

});

When(/Try to enter text in the converter field/, async () => {

});

Then(/I see the value of the field has not changed, the standard "100" is displayed/, async () => {

});

When(/I will enter a value in the converter field/, async () => {

});

When(/Choose the EUR currency/, async () => {

});

Then(/The value in BYN is calculated in the converter on the right./, async () => {

});
