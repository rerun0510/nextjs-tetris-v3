import { Box, Button, Center } from '@chakra-ui/react'
import { useRouter } from 'next/router'

import { Field } from '@/components/field'

import { useGameController } from '@/hooks'

export default function Home() {
  const router = useRouter()
  const { gameState } = useGameController()
  return (
    <Center h="100vh">
      <Box textAlign="center">
        <Field cells={gameState.cells} />
        <Button onClick={() => router.push('/counter')}>
          CounterPage
        </Button>
      </Box>
    </Center>
  )
}
