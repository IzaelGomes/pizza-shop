import { api } from '@/lib/axios'

export interface GetMonthOrderssAmountResponse {
  amount: number
  diffFromLastMonth: number
}

export async function getMonthOrderssAmount() {
  const response = await api.get<GetMonthOrderssAmountResponse>(
    '/metrics/month-orders-amount',
  )

  return response.data
}
