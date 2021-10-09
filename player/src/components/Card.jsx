import React from 'react'
import { styled } from '@player_root/stitches.config'

export const StyledCard = styled('div', {
  background: '$foreground',
  borderRadius: '$normal',
  variants: {
    state: {
      selected: {
        background: '$active'
      },
      success: {
        background: '$success'
      },
      danger: {
        background: '$danger'
      },
      warning: {
        background: '$warning'
      }
    },
    muted: {
      true: {
        opacity: 0.3
      }
    }
  }
})

export function Card({children, ...props}) {
  return <StyledCard {...props}>{children}</StyledCard>
}