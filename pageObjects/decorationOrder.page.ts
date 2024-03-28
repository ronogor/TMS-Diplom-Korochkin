import { adressAndInformationData, methodPayment } from "../data/constants";
import { cartPageUrl } from "../data/urls";
import BasePage from "./base.page";

class DecorationOrderPage extends BasePage {
    private get decorationProductPrice() {
        return $(`//div[contains(@class,'cart-form__total')]
        //div[contains(@class,'cart-form__description_primary')]
        //div[contains(@class,'cart-form__description_primary')]/span`);
    }
    
    private get decorationProductName() {
        return $(`(//div[contains(@class,'cart-form__total')]
        //div[contains(@class,'cart-form__description_primary')]
        /div/div[contains(@class,'cart-form__description-part_1')])[2]`);
    }
    private get dataFieldsInputs() {
        return $$(`//div[contains(@class,'art-form__row_condensed-fringe')]
        /child::div[contains(@class,'cart-form__group')]
        /div[contains(@class,'cart-form__field')]/descendant::input`);
    }
    private get dropdownStreet() {
        return $("//div[contains(@class,'auth-dropdown')]");
    }
    private get wayPaymentButton() {
        return $("//button[contains(@class,'cart-form__button_responsive')]");
    }
    private get activePaymentMethodLocator() {
        return $("//div[contains(@class,'cart-form__anchor-item_active')]");
    }
    private get addCartButton() {
        return $("//button[contains(@class,'cart-form__button') and contains(text(),'Добавить карту')]");
    }
    private get dropdownKillAdressLocator() {
        return $("//div[contains(@class,'cart-form__popover-trigger_ellipsis')]");
    }
    private get killAdressOptionLocator() {
        return $("//a[contains(@class,'cart-form__link_error')]");
    }

    private getMethodsPaymentLocator(idValue: string) {
        return $("//div[contains(@class,'cart-form__anchor-list')]/div[contains(@id,'{0}')]".replace("{0}", idValue));
    }


    async getProductNameOnDecorationOrder(): Promise<string> {
        return (await this.decorationProductName.getText()).trim();
    }

    async getProductPriceOnDecorationOrder(): Promise<string> {
        return (await this.decorationProductPrice.getText()).trim().replace(/[^0-9]/g,"");
    }

    async fillAdressAndInformationFields() {
        await this.dataFieldsInputs[1].setValue(adressAndInformationData.STREET);
        await this.dropdownStreet.waitForClickable();
        await browser.keys("Enter");
        await this.dataFieldsInputs[2].setValue(adressAndInformationData.HOUSE);
        await this.dataFieldsInputs[4].setValue(adressAndInformationData.ENTRANCE);
        await this.dataFieldsInputs[5].setValue(adressAndInformationData.FLOOR);
        await this.dataFieldsInputs[6].setValue(adressAndInformationData.FLAT);
        await this.dataFieldsInputs[7].setValue(adressAndInformationData.NAME);
        await this.dataFieldsInputs[8].setValue(adressAndInformationData.SURNAME);
        await this.dataFieldsInputs[10].setValue(adressAndInformationData.PHONE);
    }

    async openWayPayment() {
        await this.wayPaymentButton.scrollIntoView({ block: 'center', inline: 'center' })
        await this.wayPaymentButton.click();
    }

    async checkMethodPaymentName(namePayment: string) {
        switch (namePayment) {
            case methodPayment.CARD_ONLINE:
                expect((await this.getMethodsPaymentLocator("anchor-item_online_card").getText()).trim()).toEqual(namePayment);
                break;
            case methodPayment.MINIPAY:
                expect((await this.getMethodsPaymentLocator("anchor-item_by_parts").getText()).trim()).toEqual(namePayment);
                break;
            case methodPayment.CARD_OFFLINE:
                expect((await this.getMethodsPaymentLocator("anchor-item_offline").getText()).trim()).toEqual(namePayment);
                break;
            case methodPayment.HALVA:
                expect((await this.getMethodsPaymentLocator("anchor-item_online_installment_card").getText()).trim()).toEqual(namePayment);
                break;
            default: 
            break;
        } 
    }

    async checkActivePaymentMethod() {
        const activePaymentMethod = (await this.activePaymentMethodLocator.getText()).trim();
        
        expect(activePaymentMethod).toEqual(methodPayment.CARD_ONLINE);
    }

    async checkaddCardButtonIsActive() {
        expect(await this.addCartButton.isClickable).toBeTruthy();
    }

    async killAddress() {
        await this.dropdownKillAdressLocator.waitForClickable();
        await this.dropdownKillAdressLocator.click();
        await this.killAdressOptionLocator.click();
        await this.dataFieldsInputs[10].waitForDisplayed();
    }
}

export default new DecorationOrderPage(cartPageUrl);
