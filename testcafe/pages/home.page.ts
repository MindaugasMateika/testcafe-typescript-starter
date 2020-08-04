import { ClientFunction, Selector, t } from 'testcafe';

class HomePage {
  private homeSuccessMsg: Selector;

  constructor() {
    this.homeSuccessMsg = Selector('div[class*="success"]');
  }

  async checkLoginSuccess() {
    await t
      .expect(this.homeSuccessMsg.exists)
      .ok('check success message appears');
  }

  async checkURLSecure() {
    const getPageUrl = ClientFunction(() => window.location.href);
    await t
      .expect(await getPageUrl())
      .contains('sec', 'check current url contains secure');
  }
}

export const homePage: HomePage = new HomePage();
