import { When, Then } from "@wdio/cucumber-framework";
import LoginPage from "../pageObjects/login.page";
import RegisrationPage from "../pageObjects/regisration.page";
import { registrationFormPageUrl } from "../data/urls";
import { randomEmail, randomPassword } from "../helpers/randpmEmailAndPassword";
import { RegistrationFormNameField, confirmEmailButtonText } from "../data/constants";

When(/I will press link "Зарегистрироваться на Onliner"/, async () => {
    await LoginPage.openRegistrationForm();
});

Then(/I see registration form/, async () => {
    await RegisrationPage.checkTitleRegistrationPage();
    const currentUrl: string = await RegisrationPage.checkUrl();

    expect(currentUrl).toEqual(registrationFormPageUrl);
});

When(/I am filling in the field "Ваш e-mail", press checkbox "Agree with terms"/, async () => {
    await RegisrationPage.fillRegistrationFormField(randomEmail(), RegistrationFormNameField.EMAIL);
    await RegisrationPage.enableCheboxAgreeWithTerms();
});

When(/I will press button "Зарегистрироваться"/, async () => {
    await RegisrationPage.pressRegisterButton();
});

Then(/I see: the password fields are highlighted, and the "Укажите пароль" alert is displayed/, async () => {
    await RegisrationPage.chckAllertMessage();
});

When(/I am filling in the field "Придумайте пароль", in the field "Повторите пароль"/, async () => {
    const password: string = randomPassword();
    await RegisrationPage.fillRegistrationFormField(password, RegistrationFormNameField.PASSWORD);
    await RegisrationPage.fillRegistrationFormField(password, RegistrationFormNameField.REPEAT_PASSWORD);
});

Then(/I see message: "Очень надежный пароль, 12 символов" around field "Придумайте пароль"/, async () => {
    await RegisrationPage.checkReliblePasswordMessage();
});

Then(/I see screen "Подтвердите ваш e-mail"/, async () => {
    const buttonText: string = await RegisrationPage.getButtonTransferToEmailText();

    expect(buttonText).toEqual(confirmEmailButtonText);
});
