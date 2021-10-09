import React from 'react'
import { Card } from '@player/components/Card'

export function PlayerPill({player}) {
  return <Card css={{ padding: '$small' }}>{player.name}</Card>
}