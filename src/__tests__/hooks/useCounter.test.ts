import { useCounter } from '@/hooks'
import { Counter } from '@/libraries/counter'
import { renderHook } from '@testing-library/react'
import { act } from 'react-dom/test-utils'

describe('hooks/useCounter', () => {
  const counter = new Counter()

  describe('#initialize', () => {
    it('should initialize counter', () => {
      const { result } = renderHook(() =>
        useCounter(counter)
      )
      expect(result.current[0].count).toBe(0)
    })
  })

  describe('#increment', () => {
    it('should increment counter', () => {
      const { result } = renderHook(() =>
        useCounter(counter)
      )
      act(() => result.current[1].increment())
      expect(result.current[0].count).toEqual(1)
    })
  })

  describe('#reset', () => {
    it('should reset counter', () => {
      const { result } = renderHook(() =>
        useCounter(counter)
      )
      act(() => result.current[1].increment())
      act(() => result.current[1].reset())
      expect(counter.count).toEqual(0)
    })
  })
})
