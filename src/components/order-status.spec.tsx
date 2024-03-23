import { render } from '@testing-library/react'

import { OrderStatus } from './order-status'

describe('Order Status', () => {
  it('should display the right text when status is pending', () => {
    /* Pending */

    const wrapper = render(<OrderStatus status="pending" />)

    const statusText = wrapper.getByText('Pendente')

    const badgetElement = wrapper.getByTestId('badge')

    expect(statusText).toBeInTheDocument()
    expect(badgetElement).toHaveClass('bg-slate-400')
  })

  it('should display the right text when status is processing', () => {
    /* processing */

    const wrapper = render(<OrderStatus status="processing" />)

    const statusText = wrapper.getByText('Em preparo')

    const badgetElement = wrapper.getByTestId('badge')

    expect(statusText).toBeInTheDocument()
    expect(badgetElement).toHaveClass('bg-amber-500')
  })

  it('should display the right text when status is delivering', () => {
    /* delivering */

    const wrapper = render(<OrderStatus status="delivering" />)

    const statusText = wrapper.getByText('Em entrega')

    const badgetElement = wrapper.getByTestId('badge')

    expect(statusText).toBeInTheDocument()
    expect(badgetElement).toHaveClass('bg-amber-500')
  })

  it('should display the right text when status is delivered', () => {
    /* delivered */

    const wrapper = render(<OrderStatus status="delivered" />)

    const statusText = wrapper.getByText('Entregue')

    const badgetElement = wrapper.getByTestId('badge')

    expect(statusText).toBeInTheDocument()
    expect(badgetElement).toHaveClass('bg-emerald-500')
  })

  it('should display the right text when status is canceled', () => {
    /* canceled */

    const wrapper = render(<OrderStatus status="canceled" />)

    const statusText = wrapper.getByText('Cancelado')

    const badgetElement = wrapper.getByTestId('badge')

    expect(statusText).toBeInTheDocument()
    expect(badgetElement).toHaveClass('bg-rose-508')
  })
})
