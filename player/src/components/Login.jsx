import React from 'react'
import { Card } from '@player/components/Card'
import { socket } from '@player/socket'

export function Login() {
  function handleSubmit(e) {
    e.preventDefault()
    const data = new FormData(e.target)
    socket.send(JSON.stringify({type: 'nickname', data: data.get('nickname')}))
  }
  
  return <Card css={{ padding: '$normal' }}>
    <p>Please enter your nickname to join the room</p>
    <form action="" onSubmit={handleSubmit}>
      <input type="text" placeholder="Nickname" name="nickname"/>
    </form>
  </Card>
}