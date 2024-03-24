import { setupWorker } from 'msw/browser'

import { env } from '@/env'

import { getDailyRevenueInPeriod } from './get-daily-revenue-in-period-mock'
import { getDayOrdersAmountMock } from './get-day-orders-amount-mock'
import { getManagedRestaurantMock } from './get-managed-restaurant-mock'
import { getMonthCanceledOrdersAmountMock } from './get-month-canceled-order-amount-mock'
import { getMonthOrdersAmount } from './get-month-orders-amount-mock'
import { getMonthRevenue } from './get-month-revenue-mock'
import { getPopularProducts } from './get-popular-products-mock'
import { getProfileMock } from './get-profile-mock'
import { registerRestaurantMock } from './register-restaurant-mock'
import { signInMock } from './sign-in.mock'
import { updateProfileMock } from './update-profile-mock'

export const worker = setupWorker(
  signInMock,
  registerRestaurantMock,
  getMonthOrdersAmount,
  getDayOrdersAmountMock,
  getMonthCanceledOrdersAmountMock,
  getMonthRevenue,
  getPopularProducts,
  getDailyRevenueInPeriod,
  updateProfileMock,
  getManagedRestaurantMock,
  getProfileMock,
)

export async function enableMSW() {
  if (env.MODE !== 'test') return
  await worker.start()
}
