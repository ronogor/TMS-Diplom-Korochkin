import { realtyPageUrl } from "../data/urls";
import BasePage from "./base.page";


class RealtyPage extends BasePage {
    private get mapOnRealtyPageLocator() {
        return $("//div[contains(@class,'arenda-map') and contains(@id,'map')]");
    }
    private get quantityRentAdvertisement() {
        return $("//div[contains(@class,'classifieds-bar__item')]");
    }
    private get priceForRentToInput() {
        return $("//input[contains(@id,'search-filter-price-to')]");
    }
    private get pricesInUSDLocators() {
        return $$("//span[contains(@class,'classified__price-value_complementary')]/span[contains(@data-bind,'USD')]");
    }
    private get undegroundDropdownLocator() {
        return $("//div[contains(@class,'dropdown_2')]");
    }
    private get aroundWithUndegroundOptionLocator() {
        return $("//div[contains(@class,'dropdown_2')]//li[contains(text(),'Возле метро')]");
    }
    private get sortingPriceDropdownLocator() {
        return $("//div[contains(@data-bind,'_.findWhere')]");
    }
    private get firstExpansiveFilterLocator() {
        return $("//li[contains(@class,'dropdown__item') and contains(text(),'Сначала дорогие')]");
    }

    private getFilterFlatLabelLocator(filter: string) {
        return $("//span[contains(@class,'filter__item-inner') and contains(text(),'{0}')]".replace("{0}", filter));
    }
    private getQuantityRoomsInFlatLocator(quantityRooms: string) {
        return $("(//span[contains(@class,'classified__caption-item') and contains(text(),'{0}')])[1]".replace("{0}", quantityRooms));
    }


    async checkAvailabilityMap() {
        await this.mapOnRealtyPageLocator.waitForDisplayed();
    }

    async enableFilter(filter: string) {
        await this.getFilterFlatLabelLocator(filter).click();
    }

    async getQuantityRentAdvertisment(): Promise<number> {
        await this.quantityRentAdvertisement.waitForDisplayed();
        return +(await (await this.quantityRentAdvertisement.getText()).trim().replace(/[^0-9]/g,""));
    }

    async checkQuantityRoomsPositive(quantityRooms: string) {
        await this.getQuantityRoomsInFlatLocator(quantityRooms).waitForDisplayed();
        expect((await this.getQuantityRoomsInFlatLocator(quantityRooms)).isDisplayed()).toBeTruthy();
    } 

    async checkQuantityRoomsNegative(quantityRooms: string) {
        await this.getQuantityRoomsInFlatLocator(quantityRooms).waitForDisplayed({ reverse: true, timeout: 1000 });
    }

    async setValueForRentPriceTo(sumInUsd: string) {
        await browser.execute(`arguments[0].setAttribute('placeholder', '${sumInUsd}');`, await this.priceForRentToInput);
        await browser.execute(`arguments[0].setAttribute('value', '${sumInUsd}');`, await this.priceForRentToInput);
        await this.priceForRentToInput.click();
        await browser.keys("Enter");
        await this.priceForRentToInput.addValue(sumInUsd);
        await browser.keys("Enter");
    }

    async checkPriceInDollarsSmollerThenValue(sumInUsd: string) {
        await this.pricesInUSDLocators.forEach( async (value) => {
            const priceInUsd: string = (await value.getText()).trim();

            expect(
                +priceInUsd <= +sumInUsd
            ).toBeTruthy();
        })
    }

    async selectOptionInUndegroundDropdown() {
        await this.undegroundDropdownLocator.click();
        await this.aroundWithUndegroundOptionLocator.waitForClickable();
        await this.aroundWithUndegroundOptionLocator.click();
    }

    async selectOptionFirstExpansive() {
        await this.sortingPriceDropdownLocator.click();
        await this.firstExpansiveFilterLocator.waitForClickable();
        await this.firstExpansiveFilterLocator.click();
    }

    async checkApplyingSorting(priceForRent: string) {
        // let i: number = 0;
        // while(+((await this.pricesInUSDLocators[0].getText()).trim()) !== +priceForRent){
        //     await this.pricesInUSDLocators
        //     i++
        //     if(i === 100){
        //         expect(true).toBeFalsy();
        //         break;
        //     }
        // }
        let previousPrice: number = +priceForRent;
        await this.pricesInUSDLocators.forEach(async (value) => {
            let priceInUsd: number = +(await value.getText()).trim();

            expect((previousPrice)).toBeGreaterThanOrEqual(priceInUsd);
            await browser.pause(1500)
            previousPrice = priceInUsd;
        }) 
    }
}       

export default new RealtyPage(realtyPageUrl);