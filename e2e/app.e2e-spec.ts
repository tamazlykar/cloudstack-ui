import { CloudstackUiPage } from './app.po';
import { browser } from 'protractor';

describe('CloudStack-UI App', () => {
  let page: CloudstackUiPage;

  beforeEach(() => {
    page = new CloudstackUiPage();
  });

  it('should be login button', () => {
    page.navigateTo();
    browser.waitForAngular();
    page.setUser();
  });
});
