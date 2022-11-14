import { Box } from '@chakra-ui/react'
import { FC, memo } from 'react'
import {
  AiOutlinePlaySquare,
  AiOutlinePauseCircle,
} from 'react-icons/ai'
import { FaSkullCrossbones } from 'react-icons/fa'

type Props = {
  isGameOver: boolean
  isActive: boolean
  changeGameMode: () => void
}

/**
 * ゲームの開始・停止を制御するボタン
 * フォーカスが当たらないでほしいため、Buttonコンポーネントを未使用
 */
export const GameModeButton: FC<Props> = memo(
  function GameModeButton({
    isGameOver,
    isActive,
    changeGameMode,
  }: Props) {
    return (
      <Box bg="gray.200" p="4px" borderRadius="4px">
        {(() => {
          if (isGameOver) {
            return (
              <FaSkullCrossbones
                size="30px"
                onClick={changeGameMode}
              />
            )
          } else if (!isActive) {
            return (
              <AiOutlinePlaySquare
                size="30px"
                onClick={changeGameMode}
              />
            )
          } else {
            return (
              <AiOutlinePauseCircle
                size="30px"
                onClick={changeGameMode}
              />
            )
          }
        })()}
      </Box>
    )
  }
)
