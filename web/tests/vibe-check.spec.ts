import { test, expect } from '@playwright/test';

test('cybernetic sieve check - verify technical dashboard', async ({ page }) => {
  await page.goto('http://localhost:3000');

  // Check title
  await expect(page).toHaveTitle(/EthnoDock Core Sieve/);

  // Check for Telemetry Stream
  await expect(page.locator('text=Telemetry Stream')).toBeVisible();

  // Check for Header
  await expect(page.locator('text=Cybernetic Sieve')).toBeVisible();

  // Simulate a search
  await page.getByPlaceholder('INITIALIZE SEARCH SEQUENCE...').fill('test query');
  await page.keyboard.press('Enter');

  // Wait for "ANALYZING MATRIX..."
  await expect(page.locator('text=ANALYZING MATRIX...')).toBeVisible();

  // Wait for results to appear (NodeGraph labels)
  await expect(page.locator('text=Pattern: Structural Bioinformatics')).toBeVisible({ timeout: 10000 });
  await expect(page.locator('text=RAG: Cybernetic Genetic Mapping')).toBeVisible();

  // Take a screenshot
  await page.screenshot({ path: 'cybernetic-sieve-vibe.png', fullPage: true });
});
