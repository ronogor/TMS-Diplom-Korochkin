import { browser } from "@wdio/globals";

export default class BasePage {
    constructor(protected url: string) {}

    async open() {
        await browser.url(this.url);
    }

    async checkUrl(): Promise<string> {
        return await browser.getUrl();
    }
}