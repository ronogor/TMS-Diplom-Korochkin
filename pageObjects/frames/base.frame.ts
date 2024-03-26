import { $ } from "@wdio/globals";
export default class BaseFrame {
    constructor(protected frameLocator: string) {}

    get iframe() {
        return $(this.frameLocator);
    }

    async switchToFrame() {
        await browser.switchToFrame(await this.iframe);
    }

    async leave() {
        await browser.switchToFrame(null);
    }
}