import React, { useState } from 'react'
import { Card } from '@player/components/Card'
import { ChoicesTemplate } from '@player/components/question/ChoicesTemplate'
import { CorrectAnswers } from '@player/components/question/CorrectAnswers'

export function QuestionChoice({choices, correctAnswer, onChange}) {
  const [value, setValue] = useState(null)
  
  function handleChange(index) {
    setValue(index)
    onChange(index)
  }
  
  return <>
    <ChoicesTemplate>
      {choices.map((answer, index) => {
        let state = null;
        let muted = false
        
        if (correctAnswer) {
          if (correctAnswer === index) {
            state = 'success'
          }
          else if (value === index) {
            state = 'danger'
          }
          else {
            muted = true
          }
        }
        else if (value === index) {
          state = 'selected'
        }
        
        return <Card key={index} onClick={() => handleChange(index)} state={state} muted={muted}>{answer}</Card>
      })}
    </ChoicesTemplate>
    {correctAnswer ? <CorrectAnswers answers={[correctAnswer]}/> : null}
  </>
}