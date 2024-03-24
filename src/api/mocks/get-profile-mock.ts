import { http, HttpResponse } from 'msw'

import { GetProfileResponse } from '../get-profile'

export const getProfileMock = http.get<never, never, GetProfileResponse>(
  '/me',
  () => {
    return HttpResponse.json({
      createdAt: new Date(),
      email: 'izaelgomes127@gmail.com',
      id: '222222',
      name: 'John Doe',
      phone: '3333333',
      role: 'manager',
      updatedAt: null,
    })
  },
)
