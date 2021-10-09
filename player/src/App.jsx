import React, { useState } from 'react'
import { Box } from '@player/components/layout/Box'
import { Login } from '@player/components/Login'
import { useStore } from '@player/store'
import { socket } from '@player/socket'
import { PlayerList } from '@player/components/player/PlayerList'
import { Question } from '@player/components/question/Question'
import { WaitingScreen } from '@player/components/WaitingScreen'

function App() {
  const setPlayer = useStore(state => state.setPlayer)
  const setPlayers = useStore(state => state.setPlayers)
  const setQuestion = useStore(state => state.setQuestion)
  const setCorrectAnswer = useStore(state => state.setCorrectAnswer)
  const player = useStore(state => state.player)
  const question = useStore(state => state.question)
  
  socket.onmessage = message => {
    const data = JSON.parse(message.data)
    console.log('received:', data);
    if (data.type === 'player') {
      setPlayer(data.data)
    }
    if (data.type === 'players') {
      setPlayers(data.data)
    }
    if (data.type === 'question') {
      setQuestion(data.data)
      setCorrectAnswer(null)
    }
    if (data.type === 'correct_response') {
      setCorrectAnswer(data.data)
    }
  }
  
  function handleNext() {
    socket.send(JSON.stringify({type: 'next'}))
  }
  
  function handleVerify() {
    socket.send(JSON.stringify({type: 'show_correct_answers'}))
  }
  
  function handleReset() {
    socket.send(JSON.stringify({type: 'reset'}))
  }
  
  
  const home = <Box>
    <Box css={{ position: 'absolute', zIndex: -1, top: 0, left: 0, right: 0, bottom: 0, opacity: 0.5 }}><PlayerList/></Box>
    {player ? <WaitingScreen message="Waiting other player..."/> : <Login/>}
  </Box>
  
  return <Box css={{ padding: '$huge', position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
    {question ? <Question question={question}/> : home}
    <button onClick={handleNext}>next</button>
    <button onClick={handleVerify}>get answers</button>
    <button onClick={handleReset}>reset</button>
  </Box>
}

export default App
