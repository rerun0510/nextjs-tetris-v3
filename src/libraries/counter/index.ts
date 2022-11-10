import { ICounter } from './interfaces'

export class Counter implements ICounter {
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
