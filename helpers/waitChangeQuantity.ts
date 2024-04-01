export async function waitChengeQuantityOnWebElement(
    resultAsyncFunction: number,
    quantityBeforeChangeWebElement: number,
): Promise<boolean> {
    let i: number = 0;
    while (resultAsyncFunction === quantityBeforeChangeWebElement) {
        resultAsyncFunction;
        i++;
        if (i === 100) {
            expect(true).toBeFalsy();
            break;
        }
    }
    return true;
}
