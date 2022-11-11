import { Counter } from '@/libraries/counter'

describe('Counter', () => {
  const counter = new Counter()

  describe('#initialize', () => {
    it('should initialize counter', () => {
      expect(counter.count).toBe(0)
    })
  })

  describe('#increment', () => {
    it('should increment counter', () => {
      counter.increment()
      expect(counter.count).toEqual(1)
    })
  })

  describe('#reset', () => {
    it('should reset counter', () => {
      counter.reset()
      expect(counter.count).toEqual(0)
    })
  })
})
