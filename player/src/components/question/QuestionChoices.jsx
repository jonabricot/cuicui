import React, { useState } from 'react'
import { Card } from '@player/components/Card'
import { ChoicesTemplate } from '@player/components/question/ChoicesTemplate'
import { CorrectAnswers } from '@player/components/question/CorrectAnswers'

export function QuestionChoices({choices, correctAnswer, onChange}) {
  const [values, setValues] = useState(choices.map((choice, index) => {
    return {index, label: choice, value: false }
  }))
  
  function handleChange(index) {
    let newValues = [...values]
    newValues[index] = {...values[index], value: !values[index].value}
    
    const serializedValues = newValues.reduce((data, current) => {
      return { ...data, [current.index]: current.value }
    }, {})
    
    onChange(serializedValues)
    setValues(newValues)
  }
  
  return <>
    <ChoicesTemplate>
      {values.map(({index, label, value}) => {
        let state = null;
        let muted = false
        
        if (correctAnswer) {
          if (correctAnswer.includes(index)) {
            state = 'success'
            
            if (value === false) {
              muted = true
            }
          }
          else if (value === true) {
            state = 'danger'
          }
          else {
            muted = true
          }
        }
        else if (value === true) {
          state = 'selected'
        }
        
        return <Card key={index} onClick={() => handleChange(index)} state={state} muted={muted}>{label}</Card>
      })}
    </ChoicesTemplate>
    {correctAnswer ? <CorrectAnswers answers={correctAnswer}/> : null}
  </>
}