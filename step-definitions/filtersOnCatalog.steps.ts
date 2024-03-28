import { Given, When, Then } from '@wdio/cucumber-framework';
import CatalogPage from '../pageObjects/catalog.page';
import { superPriceFilter } from '../data/constants';
import { expect } from '@wdio/globals';


Given(/I am on the catalog page/, async () => {
    await CatalogPage.open();
});

When(/I switch to the "Laptops" catalog category along the way: "Компьютеры и сети" - "Ноутбуки и комплектующие" - "Ноутбуки"/, async () => {
    await CatalogPage.openSectionComputersAndNetworks();
    await CatalogPage.openCompsLaptopsScreensSection();
    await CatalogPage.openLaptopsSection();
});

Then(/The "Ноутбуки" catalog page is open. Page title = "(.*)"/, async (titleName: string) => {
    const titleText: string = await CatalogPage.getTitleSectionText();

    expect(titleText).toEqual(titleName);
});

let quantityProductsBeforeFilter: string
When(/I will choose the Manufacturer = "(.*)"/, async (manufacturer: string) => {
    await CatalogPage.enableCheckboxManufactorer(manufacturer);
    quantityProductsBeforeFilter = await CatalogPage.getQuantityFoundProducts();
});

let quantityProductsAfterFirstFilter: string
Then(/The "(.*)" filter appeared at the top of the page. The number of products found has decreased/, async (manufacturer: string) => {
    const textLable: string = await CatalogPage.getFilterLableText(manufacturer);

    let i: number = 0;
    while(+(await CatalogPage.getQuantityFoundProducts()) === +quantityProductsBeforeFilter) {
        await CatalogPage.getQuantityFoundProducts();
        i++
        if(i === 100) {
            expect(true).toBeFalsy();
            break;
        }
    }

    quantityProductsAfterFirstFilter = await CatalogPage.getQuantityFoundProducts();

    expect(textLable).toEqual(manufacturer);
    expect(+quantityProductsBeforeFilter > +quantityProductsAfterFirstFilter
        ).toBeTruthy();
});

When(/I have Set the frequency of the matrix from "(.*)" to "(.*)" Hz/, async (frequencyMatrixFrom: string, frequencyMatrixTo: string) => {
    await CatalogPage.selectFrequencyFrom(frequencyMatrixFrom);
    await CatalogPage.selectFrequencyTo(frequencyMatrixTo);
});

Then(/I see the filter "(.*)" appeared at the top of the page/, async (frequencyFilter: string) => {
    const textLable: string = await CatalogPage.getFilterLableText(frequencyFilter);
    

    expect(textLable).toEqual(frequencyFilter);
});

let quantityProductsAfterSecondFilter: string
Then(/The number of products found has decreased. The "(.*)" filter is also present/, async (manufacturer: string) => {
    const textLable: string = await CatalogPage.getFilterLableText(manufacturer);

    let i: number = 0;
    while(+(await CatalogPage.getQuantityFoundProducts()) === +quantityProductsAfterFirstFilter) {
        await CatalogPage.getQuantityFoundProducts();
        i++;
        if(i === 100) {
            expect(true).toBeFalsy();
            break;
        }
    }

    quantityProductsAfterSecondFilter = await CatalogPage.getQuantityFoundProducts();

    expect(textLable).toEqual(manufacturer);
    expect(+quantityProductsAfterFirstFilter > +quantityProductsAfterSecondFilter
        ).toBeTruthy();
});

When(/I will choose filter "Суперцена"/, async () => {
    await CatalogPage.enableCheckBoxSuperPrice();
});

Then(/I see I see the "Суперцена" filter appeared at the top of the page. Only products with the icon "Скидка" are displayed/, async () => {
    const textLable: string = await CatalogPage.getFilterLableText(superPriceFilter);
    await CatalogPage.checkHotPriceInProducts();

    expect(textLable).toEqual(superPriceFilter); 
});

When(/I will remove the filter "(.*)"/, async (manufacturer: string) => {
    await CatalogPage.removeFilterLable(manufacturer);
});

Then(/Filter manufactorer has been removed, all others are present (.*)/, async (frequency: string) => {
    const textLable: string = await CatalogPage.getFilterLableText(superPriceFilter);
    const textLableFrequency: string = await CatalogPage.getFilterLableText(frequency);

    expect(textLableFrequency).toEqual(frequency);
    expect(textLable).toEqual(superPriceFilter);
});
