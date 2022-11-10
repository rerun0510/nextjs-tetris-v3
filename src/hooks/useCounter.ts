import { useState } from 'react'

import { ICounter } from '@/libraries/counter/interfaces'

export const useCounter = (counter: ICounter) => {
  const [count, setCount] = useState(0)

  const increment = (): void => {
    counter.increment()
    setCount(counter.count)
  }

  const reset = (): void => {
    counter.reset()
    setCount(counter.count)
  }

  const states = { count }
  const actions = { increment, reset }

  return [states, actions] as const
}
