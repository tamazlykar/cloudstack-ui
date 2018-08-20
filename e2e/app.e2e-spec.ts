import { CloudstackUiPage } from './app.po';

describe('CloudStack-UI App', () => {
  let page: CloudstackUiPage;

  beforeEach(() => {
    page = new CloudstackUiPage();
  });

  it('should display logo', () => {
    page.navigateTo();
    expect(page.getLogo().isPresent()).toBeTruthy();
  });
});
