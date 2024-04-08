import { When, Then } from "@wdio/cucumber-framework";
import { expect } from "@wdio/globals";
import MainPage from "../pageObjects/main.page";
import SupportPage from "../pageObjects/supportusers.page";
import { supportUsersPageUrl } from "../data/urls";
import { adressAndInformationData, randomTextString } from "../data/constants";
import { randomEmail } from "../helpers/randpmEmailAndPassword";

When(/I click on the "Поддержка пользователей" link in the footer/, async () => {
    await MainPage.openSupprtUsersSection();
});

Then(/I see page support.onliner/, async () => {
    const currentUrl: string = await SupportPage.checkUrl();

    expect(currentUrl).toEqual(supportUsersPageUrl);
});

When(/I am filling in the name field/, async () => {
    await SupportPage.filleNameField(adressAndInformationData.NAME);
    await SupportPage.clickRemoveFocusFromField();
});

Then(/I see the name field is filled in/, async () => {
    let dataInNameField: string = await SupportPage.getNameFieldText();

    expect(dataInNameField).toEqual(adressAndInformationData.NAME);
});

When(/I am clearing the name field/, async () => {
    await SupportPage.clearNameField();
});

Then(/The field displays "(.*)"/, async (defaultNameData: string) => {
    const dataNmeField: string = await SupportPage.getNameFieldText();

    expect(dataNmeField).toEqual(defaultNameData);
});

When(/I am entering an invalid e-mail in the field "Электронная почта"/, async () => {
    await SupportPage.fillEmailField(randomTextString);
});

When(/Taking the focus off the field/, async () => {
    await SupportPage.clickRemoveFocusFromField();
});

Then(/I see the field is highlighted in red (.*)/, async (error: string) => {
    await SupportPage.checkFidelityEnteredEmail(error);
});

When(/I am entering an valid e-mail in the field "Электронная почта"/, async () => {
    await SupportPage.fillEmailField(randomEmail());
});

Then(/The selection is removed (.*)/, async (valid: string) => {
    await SupportPage.checkFidelityEnteredEmail(valid);
});

Then(/I see dropdowns "Тема обращения" and "Где" are displayed, they contain more than 1 value/, async () => {
    await SupportPage.checkSubjectOfAppealOptionMoreThenOne();
    await SupportPage.checkWhereOptionMoreThenOne();
});

Then(/The fields "Краткое описание" and "Подробное описание" are displayed/, async () => {
    await SupportPage.checkDisplayedShortDescriptionField();
    await SupportPage.checkDisplayedFullDescriptionField();
});

Then(/A captcha and captcha input field is displayed/, async () => {
    await SupportPage.checkDisplayedCaptcha();
});

Then(/The "Добавить" button is displayed and enabled/, async () => {
    await SupportPage.checkDisplayedAndActiveAddButton();
});
