import { catalogPageUrl } from "../data/urls";
import BasePage from "./base.page";


class ProductPage extends BasePage {
    private get productTitleLocator() {
        return $("//h1[contains(@class,'catalog-masthead__title')]");
    }
    private get sellerOfferLinkLocator() {
        return $("//a/span[contains(text(),'Предложения продавцов')]");
    }
    private get sellersOffersTitleLocator() {
        return $("//h1[contains(@class,'catalog-masthead__title')]");
    }
    private get sortingFilterSelectLocator() {
        return $("//select[contains(@class,'input-style__real')]");
    }
    private get priceFirstProductLocator() {
        return $("(//div[contains(@class,'offers-list__description_nodecor')])[1]");
    }
    private get addToCartButton() {
        return $("(//a[contains(@class,'offers-list__button_cart') and contains(text(),'В корзину')])[2]");
    }
    private get addedToCartButton() {
        return $("(//a[contains(text(),'В корзине')])[2]");
    }
    private get counterProductInCartLocator () {
        return $("//span[contains(@class,'b-top-profile__counter') and contains(text(),1)]");
    }
    private get cartIconLocator() {
        return $("//a[contains(@class,'b-top-profile__cart')]");
    }


    async getProductTitleText(): Promise<string> {
        return (await this.productTitleLocator.getText()).trim();
    }

    async openSellersOffers() {
        await this.sellerOfferLinkLocator.click();
    }

    async getsellersOffersTitleText(): Promise<string> {
        return (await this.sellersOffersTitleLocator.getText()).trim();
    }

    async selectASort(atributeValue: string) {
        await this.sortingFilterSelectLocator.waitForDisplayed();
        await this.sortingFilterSelectLocator.selectByAttribute("value", atributeValue); 

    }

    async getPriceMoreBenefitialProduct() {
        return (await this.priceFirstProductLocator.getText()).trim().replace(/[^0-9]/g,"");
    }

    async addToCart() {
        await this.addToCartButton.waitForClickable();
        await this.addToCartButton.click();
    }

    async getAddedToCratText(): Promise<string> {
        return (await this.addedToCartButton.getText()).trim();
    }

    async getQuantityProductInCart(): Promise<number> {
        return +((await this.counterProductInCartLocator.getText()).trim());
    }

    async openCart() {
        await this.cartIconLocator.click();
    }
}

export default new ProductPage(catalogPageUrl);