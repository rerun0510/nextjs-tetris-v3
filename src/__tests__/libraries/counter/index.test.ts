import { Counter } from '@/libraries/counter'

describe('libraries/Counter', () => {
  const counter = new Counter()

  describe('#increment', () => {
    it('count must be increment', () => {
      counter.increment()
      expect(counter.count).toEqual(1)
    })
  })

  describe('#reset', () => {
    it('count must be reset', () => {
      counter.reset()
      expect(counter.count).toEqual(0)
    })
  })
})
