import { $ } from '@wdio/globals'
import BasePage from './base.page';
import { mainPageUrl } from '../data/urls';

class MainPage extends BasePage {
    private get entranceButton() {
        return $("//div[contains(@class,'auth-bar__item') and contains(text(),'Вход')]")
    }

    async openLoginPage() {
        await this.entranceButton.click();
    }
}

export default new MainPage(mainPageUrl);
