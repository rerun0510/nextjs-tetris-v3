import { Square } from '@chakra-ui/react'
import { FC, memo } from 'react'

import { Mino } from '@/libraries/tetris/enums'

import { MinoNext } from './minoNext'

type Props = {
  mino: Mino
}

/** NEXTとHOLDで使用する枠に囲まれたミノ */
export const MinoListItem: FC<Props> = memo(
  function MinoListItem({ mino }: Props) {
    return (
      <Square
        borderRadius="10px"
        border="solid 2px black"
        size="60px"
        boxSizing="content-box"
        p="4px"
        m="4px"
      >
        <MinoNext mino={mino} />
      </Square>
    )
  }
)
