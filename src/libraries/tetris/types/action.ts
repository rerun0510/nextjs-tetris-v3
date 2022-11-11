import { ActionHorizontal, ActionRotate } from '.'

export type Action =
  | ActionHorizontal
  | ActionRotate
  | 'hardDrop'
  | 'softDrop'
