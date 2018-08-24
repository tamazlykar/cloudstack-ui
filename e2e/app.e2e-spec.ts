import { CloudstackUiPage } from './app.po';
import { browser, protractor } from 'protractor';

describe('CloudStack-UI App', () => {
  let page: CloudstackUiPage;

  beforeEach(() => {
    page = new CloudstackUiPage();
  });

  it('should be login button', () => {
    page.navigateTo();
    console.log(browser.getCurrentUrl());
    const ec = protractor.ExpectedConditions.presenceOf(page.getLogin());
    browser.wait(ec, 8000);
    console.log(browser.getCurrentUrl());
  });
});
