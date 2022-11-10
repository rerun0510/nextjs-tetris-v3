import { useRouter } from 'next/router'

import {
  Button,
  Text,
  Center,
  VStack,
  HStack,
} from '@chakra-ui/react'

import { useCounter as _useCounter } from '@/hooks/useCounter'
import { Counter } from '@/libraries/counter'

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
        </HStack>
        <Button onClick={() => router.push('/')}>
          HomePage
        </Button>
      </VStack>
    </Center>
  )
}
