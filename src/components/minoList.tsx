import { Box, Flex, Text } from '@chakra-ui/react'
import { FC, memo } from 'react'

import { Mino } from '@/libraries/tetris/enums'

import { MinoListItem } from './minoListItem'

type Props = {
  nextMinos: Mino[]
}

/** 落下予定のミノを表示 */
export const MinoList: FC<Props> = memo(function MinoList({
  nextMinos,
}: Props) {
  return (
    <Box textAlign="start">
      <Text pl="4px">NEXT</Text>
      <Flex alignItems="start">
        <MinoListItem key={0} mino={nextMinos[0]} />
        <MinoListItem key={1} mino={nextMinos[1]} />
        <Box>
          {(() => {
            const items: JSX.Element[] = []
            for (let i = 2; i < 7; i++) {
              items.push(
                <MinoListItem key={i} mino={nextMinos[i]} />
              )
            }
            return items
          })()}
        </Box>
      </Flex>
    </Box>
  )
})
