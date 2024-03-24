import { http, HttpResponse } from 'msw'

import { GetMonthOrderssAmountResponse } from '../get-month-orders-amount'

export const getMonthOrdersAmount = http.get<
  never,
  never,
  GetMonthOrderssAmountResponse
>('/metrics/month-orders-amount', () => {
  return HttpResponse.json({
    amount: 15,
    diffFromLastMonth: 10,
  })
})
