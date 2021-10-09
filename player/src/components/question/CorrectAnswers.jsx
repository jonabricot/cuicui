import React from 'react'
import { Box } from '@player/components/layout/Box'

export function CorrectAnswers({answers}) {
  return <Box as='p' css={{ fontStyle: 'italic' }}>Correct {answers.length > 1 ? 'answers' : 'answer'}: {answers.join(', ')}</Box>
}