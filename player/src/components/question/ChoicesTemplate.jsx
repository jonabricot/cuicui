import React from 'react'
import { Box } from '@player/components/layout/Box'

export function ChoicesTemplate({children, ...props}) {
  return <Box css={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
    {children}
  </Box>
}