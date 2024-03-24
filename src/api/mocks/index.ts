import { setupWorker } from 'msw/browser'

import { env } from '@/env'

import { getDailyRevenueInPeriod } from './get-daily-revenue-in-period-mocks'
import { getDayOrdersAmountMock } from './get-day-orders-amount-mocks'
import { getMonthCanceledOrdersAmountMock } from './get-month-canceled-order-amount-mock'
import { getMonthOrdersAmount } from './get-month-orders-amount-mocks'
import { getMonthRevenue } from './get-month-revenue-mocks'
import { getPopularProducts } from './get-popular-products-mocks'
import { registerRestaurantMock } from './register-restaurant-mock'
import { signInMock } from './sign-in.mock'

export const worker = setupWorker(
  signInMock,
  registerRestaurantMock,
  getMonthOrdersAmount,
  getDayOrdersAmountMock,
  getMonthCanceledOrdersAmountMock,
  getMonthRevenue,
  getPopularProducts,
  getDailyRevenueInPeriod,
)

export async function enableMSW() {
  if (env.MODE !== 'test') return
  await worker.start()
}
