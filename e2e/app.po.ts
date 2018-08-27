import { browser, by, element } from 'protractor';

export class CloudstackUiPage {
  navigateTo() {
    return browser.get('/');
  }
  getLogin() {
    return element(by.css('.mat-button.mat-primary'));
  }
  setUser() {
    return element(by.name('username')).sendKeys('123');
  }
}
