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
  const [isActive, setIsActive] = useState(false)

  // テトリスのメインループ処理を実行
  const mainLoop = useCallback(() => {
    if (!isActive) {
      return
    }
    tetris.mainLoop(action)
    // キーボードイベンドのリセット
    setAction(undefined)
    setGameState(tetris.gameState)
  }, [action, isActive])

  //   一定間隔でmainLoopを実行
  useInterval({
    onUpdate: mainLoop,
  })

  const changeGameMode = () => {
    if (gameState.isGameOver) {
      // ゲームのリセット処理
      tetris.gameReset()
      setGameState(tetris.gameState)
      setIsActive(false)
    } else {
      console.log('active')
      setIsActive(!isActive)
    }
    setAction(undefined)
  }

  // キーボードイベントの取得
  useKey('ArrowLeft', () => setAction('left'))
  useKey('ArrowRight', () => setAction('right'))
  useKey('ArrowUp', () => setAction('rotate90CW'))
  useKey('ArrowDown', () => setAction('softDrop'))
  useKey('Shift', () => setAction('hold'))
  useKey(' ', () => setAction('hardDrop'))
  useKey('z', () => setAction('rotate90CCW'))
  useKey('x', () => setAction('rotate90CW'))
  useKey('p', () => changeGameMode(), undefined, [
    changeGameMode,
  ])

  return { gameState, isActive, changeGameMode }
}
