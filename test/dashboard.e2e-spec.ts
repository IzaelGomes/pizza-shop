import { expect, test } from '@playwright/test'

test('sign in sucessfully', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' })
  await expect(page.getByText('R$ 0,10')).toBeVisible()
  await expect(page.getByText('30% em relação ao mês passado')).toBeVisible()

  await expect(page.getByText('15')).toBeVisible()
  await expect(page.getByText('10% em relação ao mês passado')).toBeVisible()

  await expect(page.getByText('20', { exact: true }).first()).toBeVisible()
  await expect(page.getByText('-5% em relação a ontem')).toBeVisible()

  await expect(page.getByText('20', { exact: true }).nth(1)).toBeVisible()
  await expect(page.getByText('5% em relação ao mês passado')).toBeVisible()

  await page.waitForTimeout(2000)
})
