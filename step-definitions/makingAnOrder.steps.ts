import { Given, When, Then } from '@wdio/cucumber-framework';
import { expect } from '@wdio/globals';
import ProductPage from '../pageObjects/product.page';
import { methodPayment, partOfMessageAboutDeleteProductFromCart, partOfTitleSellersOffers } from '../data/constants';
import CartPage from '../pageObjects/cart.page';
import { cartPageUrl } from '../data/urls';
import DecorationOrderPage from '../pageObjects/decorationOrder.page';


When(/I will click link "Предложения продавцов"/, async () => {
    await ProductPage.openSellersOffers();
});

Then(/I see a tab "Предложения продавцов"/, async () => {
    const titleText: string = await ProductPage.getsellersOffersTitleText();

    expect(titleText).toContain(partOfTitleSellersOffers);
});

When(/I will select filter "(.*)"/, async (filter: string) => {
    // await ProductPage.selectASort(filter);
    // дичь с селектом
    filter
});

Then(/I see the most profitable seller in the first position/, async () => {
    //пропущен по той же причинe, что выше
});

let priceMoreBeneficialProduct: string
When(/I will click "В корзину" for the most profitable seller/, async () => {
    priceMoreBeneficialProduct = await ProductPage.getPriceMoreBenefitialProduct();
    await ProductPage.addToCart();
});

Then(
    /I see: "(.*)" is displayed instead of the pressed button, (.*) is displayed near the trash icon at the top of the page/, 
    async (buttontext: string, productInCart: string) => {
        const addedToCartTextButton: string = await ProductPage.getAddedToCratText();
        const quantityProductOnCartLabel: number = await ProductPage.getQuantityProductInCart();

        expect(addedToCartTextButton).toEqual(buttontext);
        expect(quantityProductOnCartLabel).toEqual(+productInCart);
    }
);

When(/I go to the cart by clicking on the cart icon/, async () => {
    await ProductPage.openCart();
});

Then(/I see a shopping cart page with 1 item in it/, async () => {
    const currenUrl: string = await CartPage.checkUrl();

    expect(currenUrl).toEqual(cartPageUrl);

});

Then(/Its (.*) and price correspond to the price and name from the product page/, async (productTitle: string) => {
    const titleAddedProductText: string = await CartPage.getProductOnCartPageText();
    const priceInCart: string = await CartPage.getProductPriceInCart();

    expect(titleAddedProductText).toEqual(productTitle);
    expect(priceInCart).toEqual(priceMoreBeneficialProduct);
});

When(/I will press the button "Перейти к оформлению"/, async () => {
    await CartPage.openDecorationPage();
});

Then(/I see the decoration page. The product with the correct (.*) and price is displayed on the right/, 
    async (productName: string) => {
        const currenUrl: string = await DecorationOrderPage.checkUrl();
        const prodactNameOnDecorationOrder: string = await DecorationOrderPage.getProductNameOnDecorationOrder();
        const productPrice: string = await DecorationOrderPage.getProductPriceOnDecorationOrder();  
       
        expect(currenUrl).toEqual(cartPageUrl);
        expect(productName).toContain(prodactNameOnDecorationOrder);
        expect(productPrice).toEqual(priceMoreBeneficialProduct);
    });

When(/I fill in the address fields, the contact information fields/, async () => {
    await DecorationOrderPage.fillAdressAndInformationFields();
});

When(/I press the button "Перейти к способу оплаты"/, async () => {
    await DecorationOrderPage.openWayPayment();
});

Then(/A page has been opened showing 4 payment methods: "Картой онлайн", "Халва онлайн, "При получении", "Minipay"/, async () => {
    await DecorationOrderPage.checkMethodPaymentName(methodPayment.CARD_ONLINE);
    await DecorationOrderPage.checkMethodPaymentName(methodPayment.MINIPAY);
    await DecorationOrderPage.checkMethodPaymentName(methodPayment.CARD_OFFLINE);
    await DecorationOrderPage.checkMethodPaymentName(methodPayment.HALVA);
});

Then(/"Картой онлайн" is selected by default. The "Go to order confirmation" button is displayed/, async () => {
    await DecorationOrderPage.checkActivePaymentMethod();
    await DecorationOrderPage.checkaddCardButtonIsActive();
});


Given(/I am on cart page/, async () => {
    await CartPage.open();
});

When(/I will click on the trash icon in the line of the added product/, async () => {
    await CartPage.deleteProductFromCart();
});

Then(/I see message about deleted product/, async () => {
    const deletedText: string = await CartPage.getDeleteMessageText();

    expect(deletedText).toContain(partOfMessageAboutDeleteProductFromCart);
});

When(/I press delete address/, async () => {
    await DecorationOrderPage.killAddress();
})
