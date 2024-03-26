import { Given, When, Then } from '@wdio/cucumber-framework';
// import { expect } from '@wdio/globals';


Given(/I am on the catalog page/, async () => {

});

When(/I switch to the "Laptops" catalog category along the way: "Компьютеры и сети" - "Ноутбуки и комплектующие" - "Ноутбуки"/, async () => {
    
});

Then(/The "Ноутбуки" catalog page is open. Page title = "Ноутбуки"/, async () => {

});

When(/I will choose the Manufacturer = "(.*)"/, async (manufacturer: string) => {
    manufacturer
});

Then(/The "(.*)" filter appeared at the top of the page. The number of products found has decreased/, async (manufacturer: string) => {
    manufacturer
});

When(/I have Set the frequency of the matrix from "(.*)" to "(.*)" Hz/, async (frequencyMatrixFrom: number, frequencyMatrixTo: number) => {
    frequencyMatrixFrom
    frequencyMatrixTo
});

Then(/I see the filter "(.*)" appeared at the top of the page/, async (frequencyFilter: string) => {
    frequencyFilter
});

Then(/The number of products found has decreased. The "(.*)" filter is also present/, async (manufacturer: string) => {
    manufacturer
});

When(/I will choose filter "Суперцена"/, async () => {

});

Then(/I see I see the "Суперцена" filter appeared at the top of the page. Only products with the icon "Скидка" are displayed/, async () => {

});

When(/I will remove the filter "(.*)"/, async (manufacturer: string) => {
    manufacturer
});

Then(/Filter manufactorer has been removed, all others are present/, async () => {

});
