import { useCallback, useState } from 'react'
import { useKey } from 'react-use'

import { Action } from '@/libraries/tetris/types'

import { Tetris } from '@/libraries'

import { useInterval } from './useInterval'

const tetris = new Tetris()
export const useGameController = () => {
  const [gameState, setGameState] = useState(
    tetris.gameState
  )
  const [action, setAction] = useState<Action>()

  // キーボードイベントの取得
  useKey('ArrowLeft', () => setAction('left'))
  useKey('ArrowRight', () => setAction('right'))
  useKey('ArrowUp', () => setAction(undefined))
  useKey('ArrowDown', () => setAction(undefined))

  // テトリスのメインループ処理を実行
  const mainLoop = useCallback(() => {
    tetris.mainLoop(action)
    // キーボードイベンドのリセット
    setAction(undefined)
    setGameState(tetris.gameState)
  }, [action])

  //   一定間隔でmainLoopを実行
  useInterval({
    onUpdate: mainLoop,
  })

  return { gameState, setAction }
}
