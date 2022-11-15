import {
  ActionRotate,
  Deg,
  MinoOffsetPoint,
} from '../types'

type SRSOffsets = {
  [key in Deg]: {
    [key in ActionRotate]: MinoOffsetPoint[]
  }
}

/**
 * Super Rotation Systemの補正値
 * J、L、S、T、Zミノ用
 */
export const SRS_OFFSETS: SRSOffsets = {
  0: {
    rotate90CW: [
      { pointX: 0, pointY: 0 },
      { pointX: -1, pointY: 0 },
      { pointX: -1, pointY: 1 },
      { pointX: 0, pointY: -2 },
      { pointX: -1, pointY: -2 },
    ],
    rotate90CCW: [
      { pointX: 0, pointY: 0 },
      { pointX: 1, pointY: 0 },
      { pointX: 1, pointY: 1 },
      { pointX: 0, pointY: -2 },
      { pointX: 1, pointY: -2 },
    ],
  },
  90: {
    rotate90CW: [
      { pointX: 0, pointY: 0 },
      { pointX: 1, pointY: 0 },
      { pointX: 1, pointY: -1 },
      { pointX: 0, pointY: 2 },
      { pointX: 1, pointY: 2 },
    ],
    rotate90CCW: [
      { pointX: 0, pointY: 0 },
      { pointX: 1, pointY: 0 },
      { pointX: 1, pointY: -1 },
      { pointX: 0, pointY: 2 },
      { pointX: 1, pointY: 2 },
    ],
  },
  180: {
    rotate90CW: [
      { pointX: 0, pointY: 0 },
      { pointX: 1, pointY: 0 },
      { pointX: 1, pointY: 1 },
      { pointX: 0, pointY: -2 },
      { pointX: 1, pointY: -2 },
    ],
    rotate90CCW: [
      { pointX: 0, pointY: 0 },
      { pointX: -1, pointY: 0 },
      { pointX: -1, pointY: 1 },
      { pointX: 0, pointY: -2 },
      { pointX: -1, pointY: -2 },
    ],
  },
  270: {
    rotate90CW: [
      { pointX: 0, pointY: 0 },
      { pointX: -1, pointY: 0 },
      { pointX: -1, pointY: -1 },
      { pointX: 0, pointY: 2 },
      { pointX: -1, pointY: 2 },
    ],
    rotate90CCW: [
      { pointX: 0, pointY: 0 },
      { pointX: -1, pointY: 0 },
      { pointX: -1, pointY: -1 },
      { pointX: 0, pointY: 2 },
      { pointX: -1, pointY: 2 },
    ],
  },
}

/**
 * Super Rotation Systemの補正値
 * Iミノ用
 */
export const SRS_OFFSETS_I: SRSOffsets = {
  0: {
    rotate90CW: [
      { pointX: 0, pointY: 0 },
      { pointX: -2, pointY: 0 },
      { pointX: 1, pointY: 0 },
      { pointX: -2, pointY: -1 },
      { pointX: 1, pointY: 2 },
    ],
    rotate90CCW: [
      { pointX: 0, pointY: 0 },
      { pointX: -1, pointY: 0 },
      { pointX: 2, pointY: 0 },
      { pointX: -1, pointY: 2 },
      { pointX: 2, pointY: -1 },
    ],
  },
  90: {
    rotate90CW: [
      { pointX: 0, pointY: 0 },
      { pointX: -1, pointY: 0 },
      { pointX: 2, pointY: 0 },
      { pointX: -1, pointY: 2 },
      { pointX: 2, pointY: -1 },
    ],
    rotate90CCW: [
      { pointX: 0, pointY: 0 },
      { pointX: 2, pointY: 0 },
      { pointX: -1, pointY: 0 },
      { pointX: 2, pointY: 1 },
      { pointX: -1, pointY: -2 },
    ],
  },

  180: {
    rotate90CW: [
      { pointX: 0, pointY: 0 },
      { pointX: 2, pointY: 0 },
      { pointX: -1, pointY: 0 },
      { pointX: 2, pointY: 1 },
      { pointX: -1, pointY: -2 },
    ],
    rotate90CCW: [
      { pointX: 0, pointY: 0 },
      { pointX: 1, pointY: 0 },
      { pointX: -2, pointY: 0 },
      { pointX: 1, pointY: -2 },
      { pointX: -2, pointY: 1 },
    ],
  },
  270: {
    rotate90CW: [
      { pointX: 0, pointY: 0 },
      { pointX: 1, pointY: 0 },
      { pointX: -2, pointY: 0 },
      { pointX: 1, pointY: -2 },
      { pointX: -2, pointY: 1 },
    ],
    rotate90CCW: [
      { pointX: 0, pointY: 0 },
      { pointX: -2, pointY: 0 },
      { pointX: 1, pointY: 0 },
      { pointX: -2, pointY: -1 },
      { pointX: 1, pointY: 2 },
    ],
  },
}
