import React from 'react'
import { useStore } from '@player/store'
import { Box } from '@player/components/layout/Box'
import { PlayerPill } from '@player/components/player/PlayerPill'

export function PlayerList() {
  const players = useStore(state => state.players)
  return <Box css={{ display: 'flex', flexWrap: 'wrap', padding: '$small', '& > *': {margin: '$small'} }}>{players.map((player, index) => <PlayerPill key={index} player={player}/>)}</Box>
}