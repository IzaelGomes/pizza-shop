import { DollarSign } from 'lucide-react'
import { useQuery } from 'react-query'

import { getMonthRevenue } from '@/api/get-month-revenue'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function MonthRevenueCard() {
  const { data: monthRevenueAmount } = useQuery({
    queryKey: ['metrics', 'month-revenue'],
    queryFn: getMonthRevenue,
  })
  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between gap-2 space-y-0 pb-2">
        <CardTitle className="text-base font-semibold">
          Receita total (mes)
        </CardTitle>
        <DollarSign className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent className="space-y-1">
        <p className="text-xs text-muted-foreground">
          {monthRevenueAmount && (
            <>
              <span className="text-2xl font-bold tracking-tight">
                {(monthRevenueAmount.receipt / 100).toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                })}
              </span>
              <p className="text-xs text-muted-foreground">
                {monthRevenueAmount.diffFromLastMonth >= 0 ? (
                  <>
                    <span className="text-emerald-500 dark:text-emerald-400">
                      {monthRevenueAmount.diffFromLastMonth}%
                    </span>{' '}
                    em relação ao mês passado
                  </>
                ) : (
                  <>
                    <span className="text-rose-500 dark:text-rose-400">
                      {monthRevenueAmount.diffFromLastMonth}%
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
