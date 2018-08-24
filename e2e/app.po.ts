import { browser, by, element } from 'protractor';

export class CloudstackUiPage {
  navigateTo() {
    return browser.get('/');
  }
  getLogin() {
    return element(by.css('.mat-button.mat-primary'));
  }

  getLogo() {
    return element(by.css('.logo'));
  }
}
