const { Builder, By, Key, until } = require('selenium-webdriver');

(async function example() {
  let driver = await new Builder().forBrowser('chrome').build();

  try {
    await driver.get('http://localhost:3000/admin/projects');

    const projectId = 'your_project_id';
    const deleteButton = await driver.findElement(By.id(`delete-button-${projectId}`));
    await deleteButton.click();

    await driver.wait(until.elementLocated(By.id('delete-modal')), 10000);

    const confirmButton = await driver.findElement(By.id('confirm-delete-button'));
    await confirmButton.click();

    await driver.wait(until.stalenessOf(deleteButton), 10000);

    console.log('Project deleted successfully!');
  } finally {
    await driver.quit();
  }
})();
