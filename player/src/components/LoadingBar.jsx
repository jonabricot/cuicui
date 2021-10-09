import React from 'react'
import { Box } from '@player/components/layout/Box'
import { styled } from '@player_root/stitches.config'

const StyledLoadingBar = styled(Box, {
  height: '$small',
  background: '$primary',
  width: '0px',
  '&.loading': { width: '100%' },
})

export function LoadingBar({timing, loading = false, force = false}) {
  return <StyledLoadingBar className={loading ? 'loading' : ''} css={{ transition: force ? 'none' : `width ${timing}s linear` }}/>
}