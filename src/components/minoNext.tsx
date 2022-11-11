import { Box, Flex } from '@chakra-ui/react'
import { FC, memo } from 'react'

import { Mino, minos } from '@/libraries/tetris/enums'

import { MinoSquare } from './minoSquare'

type Props = { mino: Mino }

/** Field外に表示するミノ */
export const MinoNext: FC<Props> = memo(function MinoNext({
  mino,
}: Props) {
  const { color, points } = minos[mino]
  const point = points[0]

  return (
    <Box>
      {(() => {
        const itemsI: JSX.Element[] = []
        for (let i = 0; i < point.length; i++) {
          const itemsJ: JSX.Element[] = []
          for (let j = 0; j < point[i].length; j++) {
            itemsJ.push(
              <MinoSquare
                key={j}
                size="15px"
                bg={point[i][j] ? color : ''}
                border={point[i][j] ? undefined : ''}
              />
            )
          }
          itemsI.push(<Flex key={i}>{itemsJ}</Flex>)
        }
        return <>{itemsI}</>
      })()}
    </Box>
  )
})
