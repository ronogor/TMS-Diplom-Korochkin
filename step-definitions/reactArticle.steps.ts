import { When, Then, Given } from "@wdio/cucumber-framework";
import { expect } from "@wdio/globals";
import MainPage from "../pageObjects/main.page";
import AutoPage from "../pageObjects/auto.page";
import { autoPageUrl } from "../data/urls";

Given(/I am logged in/, async () => {
    MainPage.setCookies();
});

When(/I will click on the first article in the "Авто" category/, async () => {
    await MainPage.openFirstAutoPost();
});

Then(/I see article on page 'auto.onliner.by'/, async () => {
    const currentUrl: string = await AutoPage.checkUrl();

    expect(currentUrl).toContain(autoPageUrl);
});

let quantityReactionBeforeReact: string;
When(/I will press the nearest positive react button/, async () => {
    quantityReactionBeforeReact = await AutoPage.getReactionQuantity();
    await browser.pause(2000);
    await AutoPage.setReaction();
});

let quantityReactionAfterReact: string;
Then(/I see the rest of the icons are no longer active, the number of relevant ratings increased by 1/, async () => {
    quantityReactionAfterReact = await AutoPage.getReactionQuantity();

    expect(+quantityReactionBeforeReact).toBe(+quantityReactionAfterReact - 1);
});

When(/I again will press the nearest positive react button/, async () => {
    await AutoPage.setReaction();
});

Then(/I see the rating was not removed, the number of ratings remained the same/, async () => {
    const quantityReactionAfterRepeatReact: string = await AutoPage.getReactionQuantity();

    expect(+quantityReactionAfterRepeatReact).toBe(+quantityReactionAfterReact);
});
