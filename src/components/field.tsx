import { Box, Flex } from '@chakra-ui/react'
import { FC, memo } from 'react'

import {
  FIELD_HEIGHT,
  FIELD_WALL_THICKNESS,
  FIELD_WIDTH,
} from '@/libraries/tetris/constants'
import { Cell } from '@/libraries/tetris/types'

import { MinoSquare } from './minoSquare'

type Props = {
  cells: Cell[][]
}

export const Field: FC<Props> = memo(function Field({
  cells,
}: Props) {
  return (
    <Box border="solid 2px">
      {cells.length &&
        (() => {
          const itemsI: JSX.Element[] = []
          for (
            let i = FIELD_WALL_THICKNESS;
            i < FIELD_HEIGHT - FIELD_WALL_THICKNESS;
            i++
          ) {
            const itemsJ: JSX.Element[] = []
            for (
              let j = FIELD_WALL_THICKNESS;
              j < FIELD_WIDTH - FIELD_WALL_THICKNESS;
              j++
            ) {
              const cell = cells[i][j]
              itemsJ.push(
                <MinoSquare
                  key={j}
                  bg={cell.color}
                  border={cell.color ? undefined : 'none'}
                  opacity={
                    cell.isGhost
                      ? 0.6
                      : cell.isCurrent
                      ? 0.8
                      : 1
                  }
                />
              )
            }
            itemsI.push(<Flex key={i}>{itemsJ}</Flex>)
          }
          return itemsI
        })()}
    </Box>
  )
})
