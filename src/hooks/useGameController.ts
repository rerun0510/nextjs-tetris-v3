import { useState } from 'react'
import { useKey } from 'react-use'

import { Tetris } from '@/libraries'

import { useInterval } from './useInterval'

const tetris = new Tetris()
export const useGameController = () => {
  const [gameState, setGameState] = useState(
    tetris.gameState
  )
  const [isActive, setIsActive] = useState(false)

  // テトリスのメインループ処理を実行
  const mainLoop = () => {
    if (!isActive) {
      return
    }
    tetris.mainLoop()
    setGameState(tetris.gameState)
  }

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
      setIsActive(!isActive)
    }
    tetris.setAction(undefined)
  }

  // キーボードイベントの取得
  useKey('ArrowLeft', () => tetris.setAction('left'))
  useKey('ArrowRight', () => tetris.setAction('right'))
  useKey('ArrowUp', () => tetris.setAction('rotate90CW'))
  useKey('ArrowDown', () => tetris.setAction('softDrop'))
  useKey('Shift', () => tetris.setAction('hold'))
  useKey(' ', () => tetris.setAction('hardDrop'))
  useKey('z', () => tetris.setAction('rotate90CCW'))
  useKey('x', () => tetris.setAction('rotate90CW'))
  useKey('p', () => changeGameMode(), undefined, [
    changeGameMode,
  ])

  return { gameState, isActive, changeGameMode }
}
