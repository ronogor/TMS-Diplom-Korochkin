import { When, Then } from '@wdio/cucumber-framework';
// import { expect } from '@wdio/globals';
import MainPage from '../pageObjects/main.page';
import QuickSearchFrame from '../pageObjects/frames/quickSearch.frame';
import ProductPage from '../pageObjects/product.page';


When(/I will fill "(.*)" in the quick search field/, async (product: string) => {
    await MainPage.fillQuickSearchField(product);
    await QuickSearchFrame.switchToFrame();
});

Then(/I see search popup.There is a link to the "(.*)" category among the search results/, async (product: string) => {
    const titleSearchProduct: string = await QuickSearchFrame.getSearchCategoryTitle();

    expect(titleSearchProduct).toEqual(product);
});

When(/I will clean search field/, async () => {
    await QuickSearchFrame.clearSearchInput();
});

Then(/The search results are not displayed/, async () => {
    await QuickSearchFrame.checkClearSearchField();
});

When(/I am filling in the search field with a product: "(.*)"/, async (product: string) => {
    await QuickSearchFrame.fillSearchField(product);
});

Then(/The desired product is present in the search results, the price is displayed for it, and the "Предложения" button/, async () => {
    await QuickSearchFrame.checkPriceAndOffersVisisble();
});

When(/I will click on name of the found product/, async () => {
    await QuickSearchFrame.openProductPage();
    await QuickSearchFrame.leave();
});

Then(/The product page is open. The name corresponds to the one you are looking for "(.*)"/, async (product: string) => {
    const titleText = await ProductPage.getProductTitleText();

    expect(titleText).toContain(product);
});