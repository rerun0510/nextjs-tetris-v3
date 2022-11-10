import { useEffect, useState } from 'react'

import { useRouter } from 'next/router'

import { Box, Button, Center, Text } from '@chakra-ui/react'

export default function Home() {
  const router = useRouter()
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
        <Text>テトリス</Text>
        <Button onClick={() => router.push('/counter')}>
          CounterPage
        </Button>
      </Box>
    </Center>
  )
}
