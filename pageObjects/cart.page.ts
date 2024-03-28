import { cartPageUrl } from "../data/urls";
import BasePage from "./base.page";

class CartPage extends BasePage {
    private get productOnCartPageLocator() {
        return $("//div[contains(@class,'cart-form__offers-unit_primary')]//a[contains(text(),'Руль FlashFire Suzuka ES900R')]");
    }
    private get priceProductInCart() {
        return $("(//div[contains(@class,'cart-form__offers-part_price')]/div[contains(@class,'cart-form__description_base-alter')])[2]");
    }
    private get deleteProductFromCartLocator() {
        return $("//a[contains(@class,'cart-form__button_remove')]/parent::div");
    }
    private get deleteMessageLocator() {
        return $("//div[contains(@class,'cart-form__description_condensed-extra')]");
    }
    private get goToDecorationButton() {
        return $("//a[contains(@class,'button-style_primary')]");
    }



    async getProductOnCartPageText(): Promise<string> {
        return (await this.productOnCartPageLocator.getText()).trim();
    }

    async getProductPriceInCart() {
        return (await this.priceProductInCart.getText()).trim().replace(/[^0-9]/g,"");
    }

    async deleteProductFromCart() {
        await this.deleteProductFromCartLocator.moveTo();
        await this.deleteProductFromCartLocator.click();
    }

    async getDeleteMessageText(): Promise<string> {
        return (await this.deleteMessageLocator.getText()).trim();
    }

    async openDecorationPage() {
        await this.goToDecorationButton.click();
    }
}

export default new CartPage(cartPageUrl);