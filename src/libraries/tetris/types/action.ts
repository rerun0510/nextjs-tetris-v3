import { ActionHorizontal } from '.'

export type Action =
  | ActionHorizontal
  | 'hardDrop'
  | 'softDrop'
