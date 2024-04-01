import { browser } from "@wdio/globals";
import { userToken } from "../data/constants";

export default class BasePage {
    constructor(protected url: string) {}

    async open() {
        await browser.url(this.url);
    }

    async checkUrl(): Promise<string> {
        return await browser.getUrl();
    }

    async setCookies() {
        await browser.setCookies([
            {
                name: "oss",
                value: userToken,
                domain: ".onliner.by",
                path: "/",
                httpOnly: true,
                secure: true,
                sameSite: "Lax",
            },
            {
                name: "logged_in",
                value: "1",
                domain: ".onliner.by",
                path: "/",
                httpOnly: false,
                secure: true,
                sameSite: "Lax",
            },
        ]);
    }
}
