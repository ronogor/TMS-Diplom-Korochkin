import { $ } from '@wdio/globals'
import BasePage from './base.page';
import { registrationFormPageUrl } from '../data/urls';
import { alertMessageEnterPassword, registrationPageTitle, reliblePasswordMessage } from '../data/constants';


class RegistrationPage extends BasePage {
    private get registrationFormTitleLocator () {
        return $("//div[contains(@class,'auth-form__title_big') and contains(text(),'Регистрация')]");
    }
    private get agreeWithTermsCheckbox () {
        return $("//span[contains(@class,'auth-checkbox__faux')]");
    }
    private get registerButton () {
        return $("//button[contains(@class,'auth-button_primary') and contains(text(),'Зарегистрироваться')]");
    }
    private get alertEnterPasswordLocator() {
        return $("//div[contains(@class,'auth-form__description_error')][1]")
    }
    private get reiblePasswordMessageLocator() {
        return $("//div[contains(@class,'auth-form__description_primary') and contains(text(),'Очень надежный пароль, 12 символов')]");
    }
    private get transferToEmailButtonLocator() {
        return $("//a[contains(@class,'auth-button') and contains(text(),'Перейти в почту')]");
    }

    private  getEmailFieldInput(fieldName: string) {
        return $("//input[contains(@class,'auth-input_primary') and contains(@placeholder,'{0}')]".replace("{0}", fieldName));
    }


    async checkTitleRegistrationPage() {
        const titleText: string = await this.registrationFormTitleLocator.getText();

        expect(titleText.trim()).toEqual(registrationPageTitle);
    }

    async fillRegistrationFormField(fieldData: string, fieldName: string) {
        await this.getEmailFieldInput(fieldName).setValue(fieldData);
    }

    async enableCheboxAgreeWithTerms () {
        await this.agreeWithTermsCheckbox.click();
    }

    async pressRegisterButton () {
        await this.registerButton.click();
    }

    async chckAllertMessage () {
        const allertMessage: string = await this.alertEnterPasswordLocator.getText();

        expect(allertMessage.trim()).toEqual(alertMessageEnterPassword);
    }

    async checkReliblePasswordMessage () {
        const message: string = await this.reiblePasswordMessageLocator.getText();

        expect(message.trim()).toEqual(reliblePasswordMessage);
    }

    async getButtonTransferToEmailText () {
        return await this.transferToEmailButtonLocator.getText();
    }
}

export default new RegistrationPage(registrationFormPageUrl);
