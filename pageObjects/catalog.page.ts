import { catalogPageUrl } from "../data/urls";
import BasePage from "./base.page";

class CatalogPage extends BasePage {
    private get computerAndNetworksSectionLocator() {
        return $("//li[contains(@class,'catalog-navigation-classifier__item')]//span[contains(text(),'Компьютеры и')]");
    }
    private get compLaptopsScreensSectionLocator() {
        return $(
            "//div[contains(@class,'catalog-navigation-list__aside-title') and contains(text(),'Ноутбуки, компьютеры, мониторы')]",
        );
    }
    private get laptopsSectionLocator() {
        return $(`//div[contains(@class,'catalog-navigation-list__aside-item_active')]
        //span[contains(@class,'catalog-navigation-list__dropdown-title') and contains(text(),'Ноутбуки')]`);
    }
    private get titelSectionOnPageLocator() {
        return $("//h1[contains(@class,'catalog-form__title') and contains(text(),'Ноутбуки')]");
    }
    private get frequencyMatrixSelect() {
        return $$(`(//div[contains(@class,'catalog-form__label-title') 
        and contains(text(),'Частота матрицы')]/ancestor::div[contains(@class,'catalog-form__group')]
        //select[contains(@class,'input-style__real')])`);
    }
    private get numberOfProductsLocator() {
        return $("//span[contains(@class,'atalog-interaction__sub_main')]");
    }
    private get superPriceCheckboxLocator() {
        return $(`//div[contains(@class,'catalog-form__bonus-title') and contains(text(),'Суперцена')]
        /parent::label//div[contains(@class,'i-checkbox__faux')]`);
    }
    private get elementsWithHotPrice() {
        return $$(
            "//div[contains(@class,'catalog-form__offers-flex')]//div[contains(@class,'catalog-form__popover-trigger_hot-secondary')]",
        );
    }
    private get tvLinkLocator() {
        return $("//div[contains(@class,'catalog-form__description_primary') and contains(text(),'Телевизоры')]");
    }
    private get catalogItemLinkLocator() {
        return $$(`//div[contains(@class,'catalog-form__offers-part_data')]
        //div[contains(@class,'catalog-form__description_primary')]
        //a[contains(@class,'catalog-form__link')]`);
    }
    private get comparsionPageTitleProductLocator() {
        return $$("//span[contains(@class,'product-summary__caption')]");
    }

    private getManufacturerCheckboxLocator(manufactorer: string) {
        return $(
            `//div[contains(@class,'catalog-form__checkbox-sign') and contains(text(),'{0}')]
        /parent::*/preceding-sibling::div[contains(@class,'i-checkbox__faux')]`.replace("{0}", manufactorer),
        );
    }
    private getFilterLableLocator(filer: string) {
        return $("//div[contains(@class,'catalog-form__tag-item')]/div[contains(text(),'{0}')]".replace("{0}", filer));
    }

    async openSectionComputersAndNetworks() {
        await this.computerAndNetworksSectionLocator.waitForClickable();
        await this.computerAndNetworksSectionLocator.click();
    }

    async openCompsLaptopsScreensSection() {
        await this.compLaptopsScreensSectionLocator.waitForClickable();
        await this.compLaptopsScreensSectionLocator.click();
    }

    async openLaptopsSection() {
        await this.laptopsSectionLocator.waitForClickable();
        await this.laptopsSectionLocator.click();
    }

    async getTitleSectionText(): Promise<string> {
        return (await this.titelSectionOnPageLocator.getText()).trim();
    }

    async enableCheckboxManufactorer(manufactorer: string) {
        await this.getManufacturerCheckboxLocator(manufactorer).scrollIntoView({ block: "center", inline: "center" });
        await this.getManufacturerCheckboxLocator(manufactorer).click();
    }

    async getFilterLableText(filter: string): Promise<string> {
        return (await this.getFilterLableLocator(filter).getText()).trim();
    }

    async selectFrequencyFrom(frequency: string) {
        await this.frequencyMatrixSelect[0].selectByVisibleText(frequency);
        await this.getFilterLableLocator(frequency).waitForDisplayed();
    }

    async selectFrequencyTo(frequency: string) {
        await this.frequencyMatrixSelect[1].selectByVisibleText(frequency);
        await this.getFilterLableLocator(frequency).waitForDisplayed();
    }

    async enableCheckBoxSuperPrice() {
        await this.superPriceCheckboxLocator.scrollIntoView({ block: "center", inline: "center" });
        await this.superPriceCheckboxLocator.click();
    }

    async removeFilterLable(filter: string) {
        await this.getFilterLableLocator(filter).click();
    }

    async getQuantityFoundProducts(): Promise<number> {
        await this.numberOfProductsLocator.waitForStable();
        return +(await this.numberOfProductsLocator.getText()).replace(/[^0-9]/g, "");
    }

    async checkHotPriceInProducts() {
        let i: number = 0;
        while ((await this.elementsWithHotPrice.length) < 30) {
            await this.elementsWithHotPrice;
            i++;
            if (i === 100) {
                expect(true).toBeFalsy();
                break;
            }
        }
    }

    async openTVSection() {
        (await this.tvLinkLocator).click();
    }

    async openProductPage(numberProductOnCatalogPage: string) {
        await this.catalogItemLinkLocator[+numberProductOnCatalogPage - 1].click();
    }

    async getSelectedProductTitle(numberProductOnCatalogPage: string): Promise<string> {
        return (await this.catalogItemLinkLocator[+numberProductOnCatalogPage - 1].getText()).trim();
    }

    async getTitleTextOnComparsionPage(productNumber): Promise<string> {
        return (await this.comparsionPageTitleProductLocator[+productNumber - 1].getText()).trim();
    }
}

export default new CatalogPage(catalogPageUrl);
