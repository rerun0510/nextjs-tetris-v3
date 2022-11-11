/** 操作可能なフィールドの幅 */
export const OPERABLE_FIELD_WIDTH = 10

/** 操作可能なフィールドの高さ */
export const OPERABLE_FIELD_HEIGHT = 20

/** 非干渉領域 */
export const FIELD_WALL_THICKNESS = 2

/**
 * フィールド全体の幅
 *
 * {@link OPERABLE_FIELD_WIDTH} + {@link FIELD_WALL_THICKNESS} × 2
 */
export const FIELD_WIDTH =
  OPERABLE_FIELD_WIDTH + FIELD_WALL_THICKNESS * 2

/**
 * フィールド全体の高さ
 *
 * {@link OPERABLE_FIELD_HEIGHT} + {@link FIELD_WALL_THICKNESS} × 2
 */
export const FIELD_HEIGHT =
  OPERABLE_FIELD_HEIGHT + FIELD_WALL_THICKNESS * 2

/**
 * 操作対象となるミノの初期位置(X軸)
 *
 * {@link FIELD_WALL_THICKNESS} + 3
 **/
export const MINO_INIT_POSITION_X = FIELD_WALL_THICKNESS + 3

/** 操作対象となるミノの初期位置(Y軸) */
export const MINO_INIT_POSITION_Y = 0
