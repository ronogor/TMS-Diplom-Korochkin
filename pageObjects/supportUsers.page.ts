import { supportUsersPageUrl } from "../data/urls";
import BasePage from "./base.page";

class SupportPage extends BasePage{
    private get nameFieldInput() {
        return $("//input[contains(@id,'id_name')]");
    }
    private get palceForClickLocator() {
        return $("//div[contains(@style,'text-align:right;')]");
    }
    private get emailFieldInput() {
        return $("//input[contains(@id,'id_email')]");
    }
    private get subjectOfAppealSelectOptionLocator() {
        return $$("//select[contains(@id,'id_type')]/option");
    }
    private get whereSelectOptionLocator() {
        return $$("//select[contains(@id,'id_project')]/option");
    }
    private get shortDescriptionInput() {
        return $("//input[contains(@id,'id_subject')]");
    }
    private get fullDescriptionTexarea() {
        return $("//textarea[contains(@id,'id_description')]");
    }
    private get captchaLocator() {
        return $("//input[contains(@id,'id_captcha')]");
    }
    private get addButtonLocator() {
        return $("//input[contains(@type,'image') and contains(@alt,'Добавить')]");
    }


    async filleNameField(name: string) {
        await this.nameFieldInput.waitForDisplayed();
        await this.nameFieldInput.setValue(name);
        // await browser.execute(`arguments[0].setAttribute('value', '${name}');`, await this.nameFieldInput);
    }

    async getNameFieldText(): Promise<string> {
        return await this.nameFieldInput.getValue();
    }

    async clickRemoveFocusFromField() {
        await this.palceForClickLocator.click();
    }

    async clearNameField() {
        await this.nameFieldInput.clearValue();
    }

    async fillEmailField(email: string) {
        await this.emailFieldInput.setValue(email);
    }

    async checkFidelityEnteredEmail(validOrErrorMessage: string) {
        const fidelityEnteredEmail: string = await this.emailFieldInput.getAttribute("class");

        expect(fidelityEnteredEmail).toContain(validOrErrorMessage);
    }
    
    async checkSubjectOfAppealOptionMoreThenOne() {
        const quantityOption: number = await this.subjectOfAppealSelectOptionLocator.length;

        expect(quantityOption).toBeGreaterThan(1);
    }

    async checkWhereOptionMoreThenOne() {
        const quantityOption: number = await this.whereSelectOptionLocator.length;

        expect(quantityOption).toBeGreaterThan(1);
    }

    async checkDisplayedShortDescriptionField() {
        expect(await this.shortDescriptionInput.isDisplayed()).toBeTruthy();
    }

    async checkDisplayedFullDescriptionField() {
        expect(await this.fullDescriptionTexarea.isDisplayed()).toBeTruthy();
    }

    async checkDisplayedCaptcha() {
        expect(await this.captchaLocator.isDisplayed()).toBeTruthy();
    }

    async checkDisplayedAndActiveAddButton() {
        expect(await this.addButtonLocator.isDisplayed()).toBeTruthy();
        expect(await this.addButtonLocator.isClickable()).toBeTruthy();
    }
}

export default new SupportPage(supportUsersPageUrl);