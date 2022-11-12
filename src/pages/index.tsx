import { Box, Button, Center, Flex } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import { Field } from '@/components/field'
import { MinoHold } from '@/components/minoHold'
import { MinoList } from '@/components/minoList'
import { ScoreBoard } from '@/components/scoreBoard'

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
          <MinoHold holdMino={gameState.holdMino} />
          <Field cells={gameState.cells} />
          <Flex flexDir="column" align="center">
            <MinoList nextMinos={gameState.nextMinos} />
            <ScoreBoard
              lineCount={gameState.lineCount}
              level={gameState.level}
            />
          </Flex>
        </Flex>
        <Button onClick={() => router.push('/counter')}>
          CounterPage
        </Button>
      </Box>
    </Center>
  )
}
