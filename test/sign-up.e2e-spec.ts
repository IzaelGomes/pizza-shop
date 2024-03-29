import { expect, test } from '@playwright/test'

test('navigate to new login page', async ({ page }) => {
  await page.goto('/sign-up', { waitUntil: 'networkidle' })

  await page.getByRole('link', { name: 'Fazer login' }).click()

  expect(page.url()).toContain('/sign-in')
})

test('Sign up sucessfully', async ({ page }) => {
  await page.goto('/sign-up', { waitUntil: 'networkidle' })

  await page.locator('#restaurantName').fill('Pizza Casa')
  await page.locator('#managerName').fill('Izael gomes')
  await page.locator('#email').fill('Izaelgomes127@gmail.com')
  await page.locator('#phone').fill('8888888888')

  await page.getByRole('button', { name: 'Finalizar Cadastro' }).click()

  const toast = page.getByText('Restaurante criado com sucesso.')

  await expect(toast).toBeVisible()
})

test('sign up with error', async ({ page }) => {
  await page.goto('sign-up', { waitUntil: 'networkidle' })

  await page.locator('#restaurantName').fill('pizza home')
  await page.locator('#managerName').fill('Izael gomes')
  await page.locator('#email').fill('Izaelgomes127@gmail.com')
  await page.locator('#phone').fill('8888888888')

  await page.getByRole('button', { name: 'Finalizar Cadastro' }).click()

  const toast = page.getByText('Erro ao cadastrar restaurante.')

  await expect(toast).toBeVisible()
})
