import { browser, by, element } from 'protractor';

export class CloudstackUiPage {
  navigateTo() {
    return browser.get('/');
  }

  getLogo() {
    return element(by.css('.logo'));
  }
}
