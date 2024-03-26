import { Given, When, Then } from '@wdio/cucumber-framework';
import { expect } from '@wdio/globals';
import MainPage from '../pageObjects/main.page';
import { mainPageUrl } from '../data/urls';
import LoginPage from '../pageObjects/login.page';
import { RegistredUser, loginCaptchaTitle } from '../data/constants';


Given(/I am on the main page/, async () => {
    await MainPage.open();
    let currentUrl: string = await MainPage.checkUrl();

    expect(currentUrl).toEqual(mainPageUrl);
});

When(/I will press the "Вход" button/, async () => {
    await MainPage.openLoginPage();
});

Then(/I will be on the log in page/, async () => {
    await LoginPage.checkTitleLoginPage();
});

When(/I am filling in the field "Ник или e-mail" and "Пароль"/, async () => {
    await LoginPage.fillLoginField(RegistredUser.LOGIN);
    await LoginPage.fillPasswordField(RegistredUser.PASSWORD);  
});

When(/Press the button "Войти"/, async () => {
    await LoginPage.logInToAccount();
});

Then(/I see a captcha/, async () => {
    const captchaTitle: string = await LoginPage.getCaptchaTitle();

    expect(captchaTitle).toEqual(loginCaptchaTitle);
});
