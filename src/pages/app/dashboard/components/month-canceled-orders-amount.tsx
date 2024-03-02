import { DollarSign } from 'lucide-react'
import { useQuery } from 'react-query'

import { getMonthCanceledOrdersAmount } from '@/api/get-month-canceled-orders-amount'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function MonthCanceledOrdersAmountCard() {
  const { data: monthCanceledOrderAmount } = useQuery({
    queryKey: ['metrics', 'month-canceled-amount'],
    queryFn: getMonthCanceledOrdersAmount,
  })
  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between gap-2 space-y-0 pb-2">
        <CardTitle className="text-base font-semibold">
          Cancelamentos (mês)
        </CardTitle>
        <DollarSign className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent className="space-y-1">
        <p className="text-xs text-muted-foreground">
          {monthCanceledOrderAmount && (
            <>
              <span className="text-2xl font-bold tracking-tight">
                {monthCanceledOrderAmount.amount.toLocaleString('pt-BR')}
              </span>
              <p className="text-xs text-muted-foreground">
                {monthCanceledOrderAmount.diffFromLastMonth < 0 ? (
                  <>
                    <span className="text-emerald-500 dark:text-emerald-400">
                      {monthCanceledOrderAmount.diffFromLastMonth}%
                    </span>{' '}
                    em relação ao mês passado
                  </>
                ) : (
                  <>
                    <span className="text-rose-500 dark:text-rose-400">
                      {monthCanceledOrderAmount.diffFromLastMonth}%
                    </span>{' '}
                    em relação ao mês passado
                  </>
                )}
              </p>
            </>
          )}
        </p>
      </CardContent>
    </Card>
  )
}
