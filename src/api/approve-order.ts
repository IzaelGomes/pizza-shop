import { api } from '@/lib/axios'

export interface ApproveOrderOrderParams {
  orderId: string
}

export async function approveOrder({ orderId }: ApproveOrderOrderParams) {
  await api.patch(`/orders/${orderId}/approve`)
}
