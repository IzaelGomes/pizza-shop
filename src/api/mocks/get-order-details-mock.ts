import { http, HttpResponse } from 'msw'

import {
  GetOrderDetailsParams,
  GetOrderDetailsResponse,
} from '../get-order-details'

export const getOrderDetailsMock = http.get<
  GetOrderDetailsParams,
  never,
  GetOrderDetailsResponse
>('/orders/:orderId', ({ params }) => {
  return HttpResponse.json({
    id: params.orderId,
    customer: {
      name: 'johnDoe',
      email: 'example@gmail.com',
      phone: '2323423423',
    },
    status: 'pending',
    totalInCents: 5000,
    createdAt: new Date().toString(),
    orderItems: [
      {
        id: 'item-1',
        priceInCents: 1080,
        productName: 'dddd',
        quantity: 1,
      },
      {
        id: 'item-2',
        priceInCents: 1080,
        productName: 'dddd',
        quantity: 1,
      },
    ],
  })
})
