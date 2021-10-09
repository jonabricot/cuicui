import React, { useEffect, useState } from 'react'
import { Box } from '@player/components/layout/Box'
import { QuestionChoices } from '@player/components/question/QuestionChoices'
import { QuestionFree } from '@player/components/question/QuestionFree'
import { QuestionChoice } from '@player/components/question/QuestionChoice'
import { socket } from '@player/socket'
import { useStore } from '@player/store'
import { LoadingBar } from '@player/components/LoadingBar'

function getSecond(timing) {
  return Math.round(timing/1000)
}

export function Question({question}) {
  const correctAnswer = useStore(state => state.correctAnswer)
  const [waitingScreen, setWaitingScreen] = useState(getSecond(question.wait))
  const [timing, setTiming] = useState(false)
  const [forceTiming, setForceTiming] = useState(false)
  const [response, setResponse] = useState(null)
  const [canInteract, setCanInteract] = useState(true)
  
  let component = QuestionFree
  if (question.mode === 'choices') {
    component = QuestionChoices
  }
  if (question.mode === 'choice') {
    component = QuestionChoice
  }
  
  useEffect(() => {
    const waitingInterval = setInterval(() => {
      if (waitingScreen > 0) {
        setWaitingScreen(waitingScreen - 1)
      }
      else {
        clearInterval(waitingInterval)
        setTiming(true)
      }
    }, 1000)
    
    return () => clearInterval(waitingInterval)
  }, [waitingScreen])
  
  useEffect(() => {
    setCanInteract(true)
    setTiming(false)
    setForceTiming(false)
    
    if (question.skipWaiting) {
      setWaitingScreen(0)
    }
    if (!question.skipWaiting) {
      setWaitingScreen(getSecond(question.wait))
    }
  }, [question])
  
  useEffect(() => {
    if (correctAnswer) {
      setCanInteract(false)
      setForceTiming(true)
    }
    else {
      setCanInteract(true)
      setForceTiming(false)
    }
  }, [correctAnswer])
  
  useEffect(() => {
    if (timing) {
      const responseTimeout = setTimeout(() => {
        setCanInteract(false)
      }, question.timing)
  
      return () => clearTimeout(responseTimeout)
    }
  }, [timing, question])
  
  function handleSubmit() {
    socket.send(JSON.stringify({type: 'response', data: response}))
  }
  
  const questionContent = <Box>
    <p>{question.title}</p>
    {React.createElement(component, {
      choices: question.choices,
      onChange: (value) => setResponse(value),
      correctAnswer
    })}
    <LoadingBar timing={getSecond(question.timing)} loading={timing} force={forceTiming}/>
    <button onClick={handleSubmit}>Submit</button>
    {(!canInteract && !correctAnswer) ? 'Waiting responses...' : null}
  </Box>
  
  return <Box css={{ pointerEvents: canInteract === true ? 'all' : 'none' }}>
    {waitingScreen > 0 ? waitingScreen : questionContent}
  </Box>
}