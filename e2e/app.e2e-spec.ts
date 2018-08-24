import { CloudstackUiPage } from './app.po';
import { browser } from 'protractor';

describe('CloudStack-UI App', () => {
  let page: CloudstackUiPage;

  beforeEach(() => {
    page = new CloudstackUiPage();
  });

  it('should display logo', () => {
    page.navigateTo();
    browser.sleep(5000);
    expect(page.getLogo().isPresent()).toBeTruthy();
  });
});
