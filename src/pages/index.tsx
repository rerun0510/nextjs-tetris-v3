import { useEffect, useState } from 'react'

import { useRouter } from 'next/router'

import { Center } from '@chakra-ui/react'

export default function Home() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (router.isReady) {
      setLoading(false)
    }
  }, [router.isReady])

  if (loading) return <></>

  return <Center h="100vh">テトリス</Center>
}
