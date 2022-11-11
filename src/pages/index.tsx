import { Box, Button, Center, Flex } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import { Field } from '@/components/field'
import { MinoList } from '@/components/minoList'

import { useGameController } from '@/hooks'

export default function Home() {
  const router = useRouter()
  const { gameState } = useGameController()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (router.isReady) {
      setLoading(false)
    }
  }, [router.isReady])

  if (loading) return <></>

  return (
    <Center h="100vh">
      <Box textAlign="center">
        <Flex>
          <Field cells={gameState.cells} />
          <MinoList nextMinos={gameState.nextMinos} />
        </Flex>
        <Button onClick={() => router.push('/counter')}>
          CounterPage
        </Button>
      </Box>
    </Center>
  )
}
