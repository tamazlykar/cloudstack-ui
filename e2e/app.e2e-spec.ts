import { CloudstackUiPage } from './app.po';
import { browser, protractor } from 'protractor';

describe('CloudStack-UI App', () => {
  let page: CloudstackUiPage;

  beforeEach(() => {
    page = new CloudstackUiPage();
  });

  it('should be login button', () => {
    page.navigateTo();
    const ec = protractor.ExpectedConditions.presenceOf(page.getLogin());
    browser.wait(ec, 8000);
  });
});
