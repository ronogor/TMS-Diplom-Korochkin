import { catalogPageUrl } from "../data/urls";
import BasePage from "./base.page";


class ProductPage extends BasePage {
    private get productTitleLocator() {
        return $("//h1[contains(@class,'catalog-masthead__title')]");
    }


    async getProductTitleText():Promise<string> {
        return (await this.productTitleLocator.getText()).trim();
    }
}

export default new ProductPage(catalogPageUrl);