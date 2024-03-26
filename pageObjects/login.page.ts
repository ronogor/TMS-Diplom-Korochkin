import { $ } from '@wdio/globals'
import BasePage from './base.page';
import { mainPageUrl } from '../data/urls';
import { loginPageTitle } from '../data/constants';



class LoginPage extends BasePage {
    private get loginFormTitleLocator() {
        return $("//div[contains(@class,'auth-form__title_big')]");
    }
    private get loginFieldInput() {
        return $("//input[contains(@class,'auth-input_primary') and contains(@placeholder,'Ник или e-mail')]");
    }
    private get passwordFieldInput() {
        return $("//input[contains(@class,'auth-input_primary') and contains(@placeholder,'Пароль')]");
    }
    private get entranceButton() {
        return $("//button[contains(@class,'auth-button_primary')]");
    }
    private get captchaLocator() {
        return $("//div[contains(@class,'auth-form__title_condensed-other')]");
    }
    private get registrationFormLocator() {
        return $("//a[contains(@class,'auth-form__link_primary') and contains(text(),'Зарегистрироваться на Onlíner')]");
    }


    async checkTitleLoginPage() {
        const titleText: string = await this.loginFormTitleLocator.getText();
        expect(titleText.trim()).toEqual(loginPageTitle);
    }

    async fillLoginField(login: string) {
        await this.loginFieldInput.setValue(login);
    }

    async fillPasswordField(password: string) {
        await this.passwordFieldInput.setValue(password);
    }

    async logInToAccount() {
        await this.entranceButton.click();
    }

    async getCaptchaTitle(): Promise<string> {
        return await this.captchaLocator.getText();
    }

    async openRegistrationForm() {
        await this.registrationFormLocator.click();
    }
}

export default new LoginPage(mainPageUrl);
