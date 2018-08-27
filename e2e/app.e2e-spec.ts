import { CloudstackUiPage } from './app.po';
import { browser, protractor } from 'protractor';

describe('CloudStack-UI App', () => {
  let page: CloudstackUiPage;

  beforeEach(() => {
    page = new CloudstackUiPage();
  });

  it('should be login button', () => {
    page.navigateTo();
    browser.getCurrentUrl().then(a => console.log(a));
    const ec = protractor.ExpectedConditions.presenceOf(page.getLogin());
    browser.wait(ec, 8000);
    browser.getCurrentUrl().then(a => console.log(a));
  });
});
