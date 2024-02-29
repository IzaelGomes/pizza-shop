import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { ArrowRight, Search, X } from 'lucide-react'
import { useState } from 'react'
import { useMutation, useQueryClient } from 'react-query'

import { approveOrder } from '@/api/approve-order'
import { cancelOrder } from '@/api/cancel-order'
import { deliverOrder } from '@/api/deliver-order'
import { dispatchOrder } from '@/api/dispatch-order'
import { GetOrderResponse } from '@/api/get-orders'
import { OrderStatus } from '@/components/order-status'
import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { TableCell, TableHead, TableRow } from '@/components/ui/table'

import { OrderDetails } from './order-details'
export interface OrderTableRowProps {
  orders: {
    orderId: string
    createdAt: string
    status: 'pending' | 'canceled' | 'processing' | 'delivering' | 'delivered'
    customerName: string
    total: number
  }
}

export function OrderTableRow({ orders }: OrderTableRowProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const queryClient = useQueryClient()

  function updateOrderStatusOnCache(orderId: string, status: OrderStatus) {
    const orderListCached = queryClient.getQueriesData<GetOrderResponse>({
      queryKey: ['orders'],
    })

    orderListCached.forEach(([cacheKey, cacheData]) => {
      if (!cacheData) {
        return
      }

      queryClient.setQueryData<GetOrderResponse>(cacheKey, {
        ...cacheData,
        orders: cacheData.orders.map((order) => {
          if (order.orderId === orderId) {
            return { ...order, status }
          }

          return order
        }),
      })
    })
  }

  const { mutateAsync: cancelOrderFn, isLoading: isCancelLoading } =
    useMutation({
      mutationFn: cancelOrder,
      async onSuccess(_, { orderId }) {
        updateOrderStatusOnCache(orderId, 'canceled')
      },
    })

  const { mutateAsync: approveFn, isLoading: isApproveLoading } = useMutation({
    mutationFn: approveOrder,
    async onSuccess(_, { orderId }) {
      updateOrderStatusOnCache(orderId, 'processing')
    },
  })

  const { mutateAsync: dispatchFn, isLoading: isDispatchLoading } = useMutation(
    {
      mutationFn: dispatchOrder,
      async onSuccess(_, { orderId }) {
        updateOrderStatusOnCache(orderId, 'delivered')
      },
    },
  )

  const { mutateAsync: deliverFn, isLoading: isDeliverLoading } = useMutation({
    mutationFn: deliverOrder,
    async onSuccess(_, { orderId }) {
      updateOrderStatusOnCache(orderId, 'delivering')
    },
  })

  return (
    <TableRow>
      <TableCell>
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              size="xs"
              onClick={() => setIsModalOpen((state) => !state)}
            >
              <Search className="h-3 w-3" />
              <span className="sr-only">Detalhes do pedido</span>
            </Button>
          </DialogTrigger>

          <OrderDetails orderId={orders.orderId} open={isModalOpen} />
        </Dialog>
      </TableCell>
      <TableCell className="font-mono text-xs font-medium">
        {orders.orderId}
      </TableCell>
      <TableCell className="text-muted-foreground">
        {formatDistanceToNow(orders.createdAt, {
          locale: ptBR,
          addSuffix: true,
        })}
      </TableCell>
      <TableCell>
        <OrderStatus status={orders.status} />
      </TableCell>
      <TableCell className="font-medium">{orders.customerName}</TableCell>
      <TableCell className="font-medium">
        {(orders.total / 100).toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        })}
      </TableCell>

      <TableCell>
        {orders.status === 'pending' && (
          <Button
            variant="outline"
            className="ghost"
            size="xs"
            disabled={isApproveLoading}
            onClick={() => approveFn({ orderId: orders.orderId })}
          >
            <ArrowRight className="mr-2 h-3 w-3" />
            Aprovar
          </Button>
        )}

        {orders.status === 'processing' && (
          <Button
            variant="outline"
            className="ghost"
            size="xs"
            disabled={isDeliverLoading}
            onClick={() => dispatchFn({ orderId: orders.orderId })}
          >
            <ArrowRight className="mr-2 h-3 w-3" />
            Em entrega
          </Button>
        )}

        {orders.status === 'delivering' && (
          <Button
            variant="outline"
            className="ghost"
            size="xs"
            disabled={isDispatchLoading}
            onClick={() => deliverFn({ orderId: orders.orderId })}
          >
            <ArrowRight className="mr-2 h-3 w-3" />
            Entregue
          </Button>
        )}
      </TableCell>
      <TableHead>
        <Button
          className="ghost"
          size="xs"
          disabled={
            !['pending', 'processing'].includes(orders.status) ||
            isCancelLoading
          }
          onClick={() => cancelOrderFn({ orderId: orders.orderId })}
        >
          <X className="mr-2 h-3 w-3" />
          Cancelar
        </Button>
      </TableHead>
    </TableRow>
  )
}
