import React from 'react'
import { Box } from '@/components/layout/Box'

function App() {
  return <Box css={{ padding: '$huge', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
    <Box css={{ backgroundColor: '$foreground', padding: '$huge' }}>
      app content
    </Box>
  </Box>
}

export default App
