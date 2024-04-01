import { $ } from "@wdio/globals";
import BaseFrame from "./base.frame";
import { quickSearchFrame } from "../../data/frames";

class QuickSearchFrame extends BaseFrame {
    private get linkOnSearchCategoryLocator() {
        return $("//div/a[contains(@class,'category__title') and contains(text(),'Карты памяти')]");
    }
    private get searchInput() {
        return $("//div[contains(@class,'search__bar-wrapper')]/input[contains(@class,'search__input')]");
    }
    private get priceLocator() {
        return $("//span[contains(@data-bind,'root.format.minPrice')]");
    }
    private get offersLocator() {
        return $("//a[contains(@class,'button_orange') and contains(text(),'предлож')]");
    }
    private get productTitleLinkLocator() {
        return $("//div[contains(@class,'product__title')]/a");
    }

    async getSearchCategoryTitle() {
        return (await this.linkOnSearchCategoryLocator.getText()).trim();
    }

    async clearSearchInput() {
        return await this.searchInput.clearValue();
    }

    async checkClearSearchField() {
        await this.linkOnSearchCategoryLocator.waitForDisplayed({ reverse: true });

        expect(await this.linkOnSearchCategoryLocator.isDisplayed()).toBeFalsy();
    }

    async fillSearchField(searchTerm: string) {
        await this.searchInput.setValue(searchTerm);
    }

    async checkPriceAndOffersVisisble() {
        await this.priceLocator.waitForDisplayed();
        await this.offersLocator.waitForDisplayed();
        const priceAvailable: boolean = await this.priceLocator.isDisplayed();
        const offersAvailable: boolean = await this.offersLocator.isDisplayed();

        expect(priceAvailable).toBeTruthy();
        expect(offersAvailable).toBeTruthy();
    }

    async openProductPage() {
        await this.productTitleLinkLocator.click();
    }
}

export default new QuickSearchFrame(quickSearchFrame);
