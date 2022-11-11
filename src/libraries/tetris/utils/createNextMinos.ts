import { Mino, minos } from '../enums'

import { shuffleArray } from '.'

/** ７種類のミノから並び順がランダムな配列を作成 */
export const createNextMinos = (): Mino[] => [
  ...shuffleArray(
    Object.keys(minos).filter((v) => v !== 'none')
  ),
]
