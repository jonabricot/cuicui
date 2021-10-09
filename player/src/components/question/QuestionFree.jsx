import React, { useEffect, useState } from 'react'
import { Box } from '@player/components/layout/Box'
import { CorrectAnswers } from '@player/components/question/CorrectAnswers'

export function QuestionFree({correctAnswer, onChange}) {
  const [value, setValue] = useState('')
  const [valid, setValid] = useState(null)
  
  function handleInput(e) {
    const newValue = e.target.value
    setValue(newValue)
    onChange(newValue)
  }
  
  useEffect(() => {
    console.log(value)
    if (correctAnswer) {
      if (value === correctAnswer) {
        setValid(true)
      }
      else {
        setValid(false)
      }
    }
  }, [correctAnswer, value])
  
  return <>
    <Box as='input' placeholder='Enter your response here...' onInput={handleInput} css={{ borderColor: valid === true ? '$success' : valid === false ? '$danger' : null}}/>
    {correctAnswer ? <CorrectAnswers answers={[correctAnswer]}/> : null}
  </>
}