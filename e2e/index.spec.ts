import { test, expect, chromium } from '@playwright/test'

const categories = [
  {
    id: '1',
    title: 'Category 1',
    items: [
      { id: '1', title: 'Movie 1', photoUrL: 'movie1.jpg' },
      { id: '2', title: 'Movie 2', photoUrL: 'movie2.jpg' },
    ],
  },
];

test('User should not be able to select more than one movie per category', async ({ page: any }) => {

  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.evaluate((data) => {
    // @ts-ignore
    window['__MOCKED_DATA__'] = data;
  }, categories);

  await page.goto('http://localhost:3000');
  await page. waitForSelector('.movie-card[data-category-id="1"]');

  // Find the movie cards for Category 1
  const movieCards = await page.$$('.movie-card[data-category-id="1"]');
  await movieCards[0].click();

  // Assert that the first movie is selected
  expect(await movieCards[0].getAttribute('class')).toContain('activeBtn');
  await movieCards[1].click();

  // Assert that the first movie is still selected and the second movie is not selected
  expect(await movieCards[0].getAttribute('class')).toContain('activeBtn');
  expect(await movieCards[1].getAttribute('class')).not.toContain('activeBtn');

  await browser.close();
})

test('Show success modal only once user has selected one movie each from all the listed categories', async () => {

  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.evaluate((data) => {
    // @ts-ignore
    window['__MOCKED_DATA__'] = data;
  }, categories);

  await page.goto('http://localhost:3000');
  await page.waitForSelector('[data-testid="movie-card"][data-category-id="1"]');

  // Find the movie cards for each category
  const movieCards = await page.$$('[data-testid="movie-card"]');

  // Select one movie from each category
  for (const card of movieCards) {
    await card.click();
  }

  await page.click('[data-testid="submit-ballot-button"]');

  // Wait for the modal to display
  await page.waitForSelector('[data-testid="success-modal"]');

  // Assert that the success modal is displayed
  const successModal = await page.$('[data-testid="success-modal"]');
  expect(successModal).toBeTruthy();

  await browser.close();
});