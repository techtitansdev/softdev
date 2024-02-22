import { Builder, By, Key, until, WebDriver } from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome';
import path from 'chromedriver';

// const service = new chrome.ServiceBuilder(path).build();
// chrome.setDefaultService(service);

const appUrl = 'http://localhost:3000/admin/project';

describe('Delete Project Feature', () => {
  let driver: WebDriver;

  beforeAll(async () => {
    driver = await new Builder().forBrowser('chrome').build();
    await driver.get(appUrl);
  });

  afterAll(async () => {
    await driver.quit();
  });

  it('should delete a project', async () => {
    const projectId = 'example-project-id';
    const deleteButton = await driver.findElement(By.id(`delete-${projectId}`));
    await deleteButton.click();

    const confirmButton = await driver.findElement(By.id('confirm-delete'));
    await confirmButton.click();

    await driver.wait(until.stalenessOf(deleteButton), 5000);
  });
});