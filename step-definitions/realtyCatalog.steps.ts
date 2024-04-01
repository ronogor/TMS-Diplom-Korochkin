import { When, Then } from "@wdio/cucumber-framework";
import MainPage from "../pageObjects/main.page";
import { expect } from "@wdio/globals";
import RealtyPage from "../pageObjects/realty.page";
import { waitChengeQuantityOnWebElement } from "../helpers/waitChangeQuantity";
import { FiltersOnRealtyPage, QuantityRooms } from "../data/constants";

When(/I go to the page on the way: "Дома и квартиры" - "Аренда" - "Минск"/, async () => {
    await MainPage.openRealtyPageRentMinsk();
});

let quantityRentAdvertismentBeforeFilter: number;
Then(/The real estate catalog page is open, the map is displayed/, async () => {
    await RealtyPage.checkAvailabilityMap();
    quantityRentAdvertismentBeforeFilter = await RealtyPage.getQuantityRentAdvertisment();
});

When(/I choose filter "Квартира"/, async () => {
    await RealtyPage.enableFilter(FiltersOnRealtyPage.FLAT);
});

let quantityRentAdvertismentAfterFlatFilter: number;
Then(
    /I see the number of results on the page has decreased, only ads marked "1k, 2k, 3k, 4k" are displayed, but not "Комната"/,
    async () => {
        await browser.waitUntil(async () => {
            return await waitChengeQuantityOnWebElement(
                await RealtyPage.getQuantityRentAdvertisment(),
                quantityRentAdvertismentBeforeFilter,
            );
        });
        quantityRentAdvertismentAfterFlatFilter = await RealtyPage.getQuantityRentAdvertisment();

        expect(quantityRentAdvertismentBeforeFilter).toBeGreaterThan(quantityRentAdvertismentAfterFlatFilter);
        await RealtyPage.checkQuantityRoomsPositive(QuantityRooms.ONE);
        await RealtyPage.checkQuantityRoomsPositive(QuantityRooms.TWO);
        await RealtyPage.checkQuantityRoomsPositive(QuantityRooms.THREE);
        await RealtyPage.checkQuantityRoomsPositive(QuantityRooms.FOUR);
        await RealtyPage.checkQuantityRoomsNegative(QuantityRooms.ROOM);
    },
);

When(/I сhoose only 2-room apartments/, async () => {
    await RealtyPage.enableFilter(FiltersOnRealtyPage.TWO_ROOMS);
});

let quantityRentAdvertismentAfterQuantityRoomFilter: number;
Then(/I see the number of results on the page has decreased, only ads marked "2k" are displayed/, async () => {
    await browser.waitUntil(async () => {
        return await waitChengeQuantityOnWebElement(
            await RealtyPage.getQuantityRentAdvertisment(),
            quantityRentAdvertismentAfterFlatFilter,
        );
    });
    quantityRentAdvertismentAfterQuantityRoomFilter = await RealtyPage.getQuantityRentAdvertisment();

    expect(quantityRentAdvertismentAfterFlatFilter).toBeGreaterThan(quantityRentAdvertismentAfterQuantityRoomFilter);
    await RealtyPage.checkQuantityRoomsPositive(QuantityRooms.TWO);
    await RealtyPage.checkQuantityRoomsNegative(QuantityRooms.ONE);
});

When(/I set the price to (.*) dollars/, async (priceForRent: string) => {
    await RealtyPage.setValueForRentPriceTo(priceForRent);
});

let quantityRentAdvertismentAfterCurrencyToFilter: number;
Then(
    /I see the number of results on the page has decreased, only ads with a dollar price <= (.*) dollars are displayed/,
    async (priceForRent: string) => {
        await browser.waitUntil(async () => {
            return await waitChengeQuantityOnWebElement(
                await RealtyPage.getQuantityRentAdvertisment(),
                quantityRentAdvertismentAfterQuantityRoomFilter,
            );
        });
        quantityRentAdvertismentAfterCurrencyToFilter = await RealtyPage.getQuantityRentAdvertisment();
        await RealtyPage.checkPriceInDollarsSmollerThenValue(priceForRent);

        expect(quantityRentAdvertismentAfterQuantityRoomFilter).toBeGreaterThan(
            quantityRentAdvertismentAfterCurrencyToFilter,
        );
    },
);

When(/I Choose "Метро" - "Возле метро"/, async () => {
    await RealtyPage.selectOptionInUndegroundDropdown();
});

let quantityRentAdvertismentAfterUndegroundFilter: number;
When(/I see the number of results on the page has decreassed/, async () => {
    await browser.waitUntil(async () => {
        return await waitChengeQuantityOnWebElement(
            await RealtyPage.getQuantityRentAdvertisment(),
            quantityRentAdvertismentAfterCurrencyToFilter,
        );
    });
    quantityRentAdvertismentAfterUndegroundFilter = await RealtyPage.getQuantityRentAdvertisment();

    expect(quantityRentAdvertismentAfterCurrencyToFilter).toBeGreaterThan(
        quantityRentAdvertismentAfterUndegroundFilter,
    );
});

When(/I choose the "Сначала дорогие"/, async () => {
    await RealtyPage.selectOptionFirstExpansive();
});

Then(/The apartment that was displayed before sorting is not displayed first (.*)/, async (priceForRent: string) => {
    await RealtyPage.checkApplyingSorting(priceForRent);
});
