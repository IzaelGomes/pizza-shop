import { expect, test } from '@playwright/test'

test('List orders', async ({ page }) => {
  await page.goto('/orders', { waitUntil: 'networkidle' })
  await expect(
    page.getByRole('cell', { name: 'order-1', exact: true }),
  ).toBeVisible()

  await expect(
    page.getByRole('cell', { name: 'order-10', exact: true }),
  ).toBeVisible()
})

test('paginate orders', async ({ page }) => {
  await page.goto('/orders', { waitUntil: 'networkidle' })
  await page.getByRole('button', { name: 'Próxima página' }).click()

  await expect(page.getByText('Página 2 de')).toBeVisible()

  await expect(
    page.getByRole('cell', { name: 'order-11', exact: true }),
  ).toBeVisible()

  await expect(
    page.getByRole('cell', { name: 'order-20', exact: true }),
  ).toBeVisible()

  await page.getByRole('button', { name: 'Página anterior' }).click()

  await expect(page.getByText('Página 1 de')).toBeVisible()

  await expect(
    page.getByRole('cell', { name: 'order-1', exact: true }),
  ).toBeVisible()

  await expect(
    page.getByRole('cell', { name: 'order-10', exact: true }),
  ).toBeVisible()

  await page.getByRole('button', { name: 'Útima página' }).click()

  await expect(page.getByText('Página 6 de')).toBeVisible()

  await expect(
    page.getByRole('cell', { name: 'order-51', exact: true }),
  ).toBeVisible()

  await expect(
    page.getByRole('cell', { name: 'order-60', exact: true }),
  ).toBeVisible()

  await page.getByRole('button', { name: 'Primeira página' }).click()

  await expect(page.getByText('Página 1 de')).toBeVisible()

  await expect(
    page.getByRole('cell', { name: 'order-1', exact: true }),
  ).toBeVisible()

  await expect(
    page.getByRole('cell', { name: 'order-10', exact: true }),
  ).toBeVisible()
})

test('filter by status', async ({ page }) => {
  await page.goto('/orders', { waitUntil: 'networkidle' })

  await page.getByRole('combobox').click()
  await page.getByLabel('Pendente').click()

  await page.getByRole('button', { name: 'Filtrar resultado' }).click()

  const tableRows = await page.getByRole('cell', { name: 'Pendente' }).all()

  expect(tableRows).toHaveLength(10)
})
