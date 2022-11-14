import {
  Box,
  Button,
  Center,
  Flex,
  Text,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import { Field } from '@/components/field'
import { GameModeButton } from '@/components/gameModeButton'
import { MinoHold } from '@/components/minoHold'
import { MinoList } from '@/components/minoList'
import { ScoreBoard } from '@/components/scoreBoard'

import { useGameController } from '@/hooks'

export default function Home() {
  const router = useRouter()
  const { gameState, isActive, changeGameMode } =
    useGameController()
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
            <Flex align="center">
              <GameModeButton
                isActive={isActive}
                isGameOver={gameState.isGameOver}
                changeGameMode={changeGameMode}
              />
              <Box w="15px" />
              <ScoreBoard
                lineCount={gameState.lineCount}
                level={gameState.level}
              />
            </Flex>
          </Flex>
        </Flex>
        <Flex my="15px" justify="center">
          <Flex flexDir="column" align="start" mr="15px">
            <Text>左移動：←</Text>
            <Text>右移動：→</Text>
            <Text>時計回り：↑ or x</Text>
            <Text>半時計回り：z</Text>
          </Flex>
          <Flex flexDir="column" align="start">
            <Text>ソフトドロップ：↓</Text>
            <Text>ハードドロップ：Space</Text>
            <Text>ホールド：Shift</Text>
            <Text>START/PAUSE：P</Text>
          </Flex>
        </Flex>
        <Button onClick={() => router.push('/counter')}>
          CounterPage
        </Button>
      </Box>
    </Center>
  )
}
