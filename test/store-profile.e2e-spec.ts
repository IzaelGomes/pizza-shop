import { expect, test } from '@playwright/test'

test('update profile successfully', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' })

  await page.getByRole('button', { name: 'gomes' }).click()
  await page.getByText('Perfil da loja').click()

  await page.getByLabel('Nome').fill('Izael Pizzas')
  await page.getByLabel('Descrição').fill('random description')

  await page.getByRole('button', { name: 'Salvar' }).click()

  const toast = page.getByText('Perfil atualizado com sucesso!')

  expect(toast).toBeVisible()

  await page.getByRole('button', { name: 'Cancelar' }).click()

  expect(page.getByRole('button', { name: 'Izael Pizzas' })).toBeVisible()
})
