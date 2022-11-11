import { Box, Button, Center, Text } from '@chakra-ui/react'
import { useRouter } from 'next/router'

import { useGameController } from '@/hooks'

export default function Home() {
  const router = useRouter()
  const { count, key } = useGameController()
  return (
    <Center h="100vh">
      <Box textAlign="center">
        <Text>{key}</Text>
        <Text>{count}</Text>
        <Button onClick={() => router.push('/counter')}>
          CounterPage
        </Button>
      </Box>
    </Center>
  )
}
