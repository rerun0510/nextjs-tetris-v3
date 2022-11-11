/**
 * 配列の要素をシャッフルする
 */
export const shuffleArray = ([...array]): [] => {
  const cloneArray = [...array]

  const result = cloneArray.reduce((_, cur, idx) => {
    const rand = Math.floor(Math.random() * (idx + 1))
    cloneArray[idx] = cloneArray[rand]
    cloneArray[rand] = cur
    return cloneArray
  })

  return result
}
