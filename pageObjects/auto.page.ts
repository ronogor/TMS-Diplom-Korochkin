import { $ } from '@wdio/globals'
import BasePage from './base.page';
import { autoPageUrl } from '../data/urls';


class AutoPage extends BasePage {
    private get nearestReactSmileLocator() {
        return $("(//div[contains(@data-reaction,'slight_smile')]/span[contains(@class,'st-count')])[1]");
    }
    private get selectedReactLocator() {
        return $("(//div[contains(@data-reaction,'slight_smile')]/span[contains(@class,'st-count')]/ancestor::div[contains(@class,'st-selected')])[1]");
    }
    

    async getReactionQuantity(): Promise<string> {
        await this.nearestReactSmileLocator.scrollIntoView({ block: 'center', inline: 'center' });
        await this.nearestReactSmileLocator.waitForStable();
        return (await this.nearestReactSmileLocator.getText()).trim();
    }

    async setReaction() {
        await this.nearestReactSmileLocator.click();
        await this.selectedReactLocator.waitForExist();
    }
}


export default new AutoPage(autoPageUrl);
