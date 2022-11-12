import { Box, Text } from '@chakra-ui/react'
import { FC, memo } from 'react'

import { Mino } from '@/libraries/tetris/enums'

import { MinoListItem } from './minoListItem'

type Props = {
  holdMino: Mino
}

export const MinoHold: FC<Props> = memo(function MinoHold({
  holdMino,
}: Props) {
  return (
    <Box textAlign="center">
      <Text>HOLD</Text>
      <MinoListItem mino={holdMino} />
    </Box>
  )
})
