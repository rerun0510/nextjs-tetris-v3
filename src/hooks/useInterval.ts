import { useEffect } from 'react'

type Params = {
  onUpdate: () => void
}

export const useInterval = ({ onUpdate }: Params) => {
  useEffect(() => {
    const timerId = setInterval(() => {
      onUpdate()
    }, 1)
    return () => clearInterval(timerId)
  })
}
