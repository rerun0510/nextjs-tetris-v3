import { useCounter } from '@/hooks'
import { Counter } from '@/libraries/counter'
import { ICounter } from '@/libraries/counter/interfaces'
import { renderHook } from '@testing-library/react'
import { act } from 'react-dom/test-utils'

/**
 * 今回のCounterの場合はMock化する必要性はないが、
 * APIとの通信を行う場合等に処理をMock化する。
 * ※今回は{@link Counter}と全く同じ実装内容
 */
class MockCounter implements ICounter {
  private _count: number

  constructor() {
    this._count = 0
  }

  get count(): number {
    return this._count
  }

  increment(): void {
    this._count++
  }

  reset(): void {
    this._count = 0
  }
}

describe('useCounter', () => {
  const mockCounter = new MockCounter()

  describe('#initialize', () => {
    it('should initialize counter', () => {
      const { result } = renderHook(() =>
        useCounter(mockCounter)
      )
      expect(result.current[0].count).toBe(0)
    })
  })

  describe('#increment', () => {
    it('should increment counter', () => {
      const { result } = renderHook(() =>
        useCounter(mockCounter)
      )
      act(() => result.current[1].increment())
      expect(result.current[0].count).toEqual(1)
    })
  })

  describe('#reset', () => {
    it('should reset counter', () => {
      const { result } = renderHook(() =>
        useCounter(mockCounter)
      )
      act(() => result.current[1].increment())
      act(() => result.current[1].reset())
      expect(mockCounter.count).toEqual(0)
    })
  })
})
