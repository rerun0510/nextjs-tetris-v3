import {
  Button,
  Text,
  Center,
  VStack,
  HStack,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useState } from 'react'

import { useCounter as _useCounter } from '@/hooks/useCounter'

import { Counter } from '@/libraries/counter'
import { shuffleArray } from '@/libraries/tetris/utils'

// DIに関する参考記事
// https://blog.logrocket.com/dependency-injection-react/

const counter = new Counter()

type Props = {
  useCounter?: typeof _useCounter
}

export default function CounterPage({
  useCounter = _useCounter,
}: Props) {
  const router = useRouter()
  const [states, actions] = useCounter(counter)
  const [array, setArray] = useState([
    '1 ',
    '2 ',
    '3 ',
    '4 ',
    '5 ',
    '6 ',
    '7 ',
    '8 ',
    '9 ',
  ])

  return (
    <Center h="100vh">
      <VStack flexDir="column" textAlign="center">
        <Text>{states.count}</Text>
        <HStack>
          <Button onClick={() => actions.increment()}>
            increment
          </Button>
          <Button onClick={() => actions.reset()}>
            reset
          </Button>
          <Button onClick={() => actions.reset()}>
            reset
          </Button>
        </HStack>
        <Button onClick={() => router.push('/')}>
          HomePage
        </Button>
        <Text pt="20px">{array}</Text>
        <Button
          onClick={() => setArray(shuffleArray(array))}
        >
          shuffleArray
        </Button>
      </VStack>
    </Center>
  )
}
