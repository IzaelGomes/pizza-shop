import { http, HttpResponse } from 'msw'

import { GetPopularProductsResponse } from '../get-popular-product'

export const getPopularProducts = http.get<
  never,
  never,
  GetPopularProductsResponse
>('/metrics/popular-products', () => {
  return HttpResponse.json([
    { product: 'Pizza chocolate', amount: 20 },
    { product: 'Pizza amarga', amount: 20 },
    { product: 'Frango', amount: 20 },
    { product: 'Calabresa', amount: 20 },
  ])
})
