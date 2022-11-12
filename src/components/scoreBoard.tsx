import { Circle, Flex, Text } from '@chakra-ui/react'
import { FC, memo } from 'react'

type Props = {
  lineCount: number
  level: number
}

export const ScoreBoard: FC<Props> = memo(
  function ScoreBoard({ lineCount, level }: Props) {
    return (
      <Flex mt="5px">
        <Circle size="70px" border="solid 2px" mr="15px">
          <Text textAlign="center">
            LINE
            <br />
            {lineCount}
          </Text>
        </Circle>
        <Circle size="70px" border="solid 2px">
          <Text textAlign="center">
            LV.
            <br />
            {level}
          </Text>
        </Circle>
      </Flex>
    )
  }
)
