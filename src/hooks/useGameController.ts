import { useCallback, useState } from 'react'
import { useKey } from 'react-use'

import { Tetris } from '@/libraries'

import { useInterval } from './useInterval'

const tetris = new Tetris()
export const useGameController = () => {
  const [gameState, setGameState] = useState(
    tetris.gameState
  )
  const [key, setKey] = useState('')

  // キーボードイベントの取得
  useKey('ArrowLeft', (e) => setKey(e.key))
  useKey('ArrowRight', (e) => setKey(e.key))
  useKey('ArrowUp', (e) => setKey(e.key))
  useKey('ArrowDown', (e) => setKey(e.key))

  // テトリスのメインループ処理を実行
  const mainLoop = useCallback(() => {
    tetris.mainLoop(key)
    // キーボードイベンドのリセット
    setKey('')
    setGameState(tetris.gameState)
  }, [key])

  //   一定間隔でmainLoopを実行
  useInterval({
    onUpdate: mainLoop,
  })

  return { gameState, setKey }
}
