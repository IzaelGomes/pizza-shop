import { ChevronDown } from 'lucide-react'

import { Button } from './ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'

export function AccountMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant={'outline'}
          className="flex select-none items-center gap-2"
        >
          {' '}
          Pizza shop
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel className="flex flex-col">
          {' '}
          <span> Diego Fernandes</span>
          <span className="text-xs font-normal text-muted-foreground">
            {' '}
            diego@rocketseat.com.br
          </span>
        </DropdownMenuLabel>
        <DropdownMenuItem></DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
