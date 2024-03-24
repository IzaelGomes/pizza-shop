import { http, HttpResponse } from 'msw'

import { GetManagedRestaurantResponse } from '../get-managed-restaurant'

export const getManagedRestaurantMock = http.get<
  never,
  never,
  GetManagedRestaurantResponse
>('/managed-restaurant', () => {
  return HttpResponse.json({
    createdAt: new Date(),
    description: 'dasdada',
    id: 'sadsada',
    managerId: 'dsadasdad',
    name: 'gomes ',
    updatedAt: null,
  })
})
