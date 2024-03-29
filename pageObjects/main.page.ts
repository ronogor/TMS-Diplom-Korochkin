import { $ } from '@wdio/globals'
import BasePage from './base.page';
import { mainPageUrl } from '../data/urls';

class MainPage extends BasePage {
    private get entranceButton() {
        return $("//div[contains(@class,'auth-bar__item') and contains(text(),'Вход')]");
    }
    private get firstAutoPostLocator() {
        return $("(//h2/a[contains(text(),'Авто')]/ancestor::div[contains(@class,'b-main-page-news-2')]//span[contains(@class,'text-i')])[1]");
    }
    private get quickSearchInput() {
        return $("//input[contains(@class,'fast-search__input')]");
    }
    private get currenncyRateLinkLocator() {
        return $("//a[contains(@class,'b-top-navigation-informers__link')]/span[contains(@class,'js-currency-amount')]");
    }
    private get houseAndFlatsDropdownLocator() {
        return $("//span[contains(@class,'b-main-navigation__text') and contains(text(),'Дома и квартиры')]");
    }
    private get realtyRentMinskPageLinkLocator() {
        return $(`//a[contains(@class,'b-main-navigation__dropdown-title-link') and contains(text(),'Аренда')]
        /ancestor::div[contains(@class,'b-main-navigation__dropdown-column')]
        /descendant::span[contains(@class,'b-main-navigation__dropdown-advert-sign') and contains(text(),'Минск')]`);
    }


    async openLoginPage() {
        await this.entranceButton.click();
    }

    async openFirstAutoPost() {
        await this.firstAutoPostLocator.scrollIntoView({ block: 'center', inline: 'center' });
        await this.firstAutoPostLocator.click();
    }

    async fillQuickSearchField(searchTerm: string) {
        await this.quickSearchInput.setValue(searchTerm);
    }

    async openConverterPage() {
        await this.currenncyRateLinkLocator.waitForClickable();
        await this.currenncyRateLinkLocator.click();
    }

    async openRealtyPageRentMinsk() {
        await this.houseAndFlatsDropdownLocator.moveTo();
        await this.realtyRentMinskPageLinkLocator.waitForDisplayed();
        await this.realtyRentMinskPageLinkLocator.click();
    }
}

export default new MainPage(mainPageUrl);
