import { test, expect } from '@playwright/test';

test('vibe check - verify dark terminal dashboard', async ({ page }) => {
  await page.goto('http://localhost:3000');

  // Check title
  await expect(page).toHaveTitle(/EthnoDock Core Sieve/);

  // Check for Telemetry Stream
  await expect(page.locator('text=Telemetry Stream :: Core Sieve')).toBeVisible();

  // Check for Search Interface
  await expect(page.getByPlaceholder('ENTER SEARCH PARAMETERS...')).toBeVisible();

  // Check for Header
  await expect(page.locator('text=EthnoDock :: Core Sieve')).toBeVisible();

  // Simulate a search
  await page.getByPlaceholder('ENTER SEARCH PARAMETERS...').fill('test query');
  await page.getByRole('button', { name: 'Initialize Sieve' }).click();

  // Wait for "Executing Extraction..."
  await expect(page.getByRole('button', { name: 'Executing Extraction...' })).toBeVisible();

  // Wait for results to appear (NodeGraph labels)
  await expect(page.locator('text=Pattern-Match: Structural Linguistics')).toBeVisible({ timeout: 10000 });
  await expect(page.locator('text=RAG: Cross-Cultural Semantic Sieve')).toBeVisible();

  // Take a screenshot
  await page.screenshot({ path: 'vibe-check.png', fullPage: true });
});
