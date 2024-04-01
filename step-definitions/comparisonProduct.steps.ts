import { When, Then } from '@wdio/cucumber-framework';
import { expect } from '@wdio/globals';
import CatalogPage from '../pageObjects/catalog.page';
import ProductPage from '../pageObjects/product.page';
import { NumberOfProduct } from '../data/constants';


When(/I choose a section "Телевизоры"/, async () => {
    await CatalogPage.openTVSection();
});

let firstProductForComparsionTitle: string;
When(/I click on the name of the first TV/, async () => {
    firstProductForComparsionTitle = await CatalogPage.getSelectedProductTitle(NumberOfProduct.FIRST);
    await CatalogPage.openProductPage(NumberOfProduct.FIRST);
});

Then(/I see product page with selected product - first prioduct/, async () => {
    const titleProductOnProductPage: string = await ProductPage.getProductTitleText();

    expect(titleProductOnProductPage).toEqual(firstProductForComparsionTitle);
});

When(/I mark the "Добавить к сравнению" checkbox/, async () => {
    await ProductPage.enablecheckboxAddToComparsion();
});

Then(/I see the checkbox is marked, the "1 товар в сравнении" bar appeared/, async () => {
    await ProductPage.checkComparsionButtonText(NumberOfProduct.FIRST);
});

When(/I'm going back to the list with all the TVs/, async () => {
    await browser.back();
});

let secondProductForComparsionTitle: string;
When(/I click on the name of the second TV/, async () => {
    secondProductForComparsionTitle = await CatalogPage.getSelectedProductTitle(NumberOfProduct.SECOND);
    await CatalogPage.openProductPage(NumberOfProduct.SECOND);
});

Then(/I see product page with selected product - second product/, async () => {
    const titleProductOnProductPage: string = await ProductPage.getProductTitleText();

    expect(titleProductOnProductPage).toEqual(secondProductForComparsionTitle);
});

Then(/The TV page is open. After being added to the comparison, there are already "2 товара в сравнении" on the bar/, async () => {
    await ProductPage.checkComparsionButtonText(NumberOfProduct.SECOND);
});

When(/I click on the pop-up that appears with the name "2 товара в сравнении"/, async () => {
    await ProductPage.openComparsionPage();
}); 

Then(/I see page "Сравнение товаров", 2 TVs that I chose earlier. The differing characteristics should be highlighted in orange/, async () => {
    let firstProduct: string = await CatalogPage.getTitleTextOnComparsionPage(NumberOfProduct.FIRST);
    let secondProduct: string = await CatalogPage.getTitleTextOnComparsionPage(NumberOfProduct.SECOND);

    expect(firstProduct).toEqual(firstProductForComparsionTitle);
    expect(secondProduct).toEqual(secondProductForComparsionTitle);
});
