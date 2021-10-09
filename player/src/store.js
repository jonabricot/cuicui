import create from 'zustand'

export const useStore = create(set => ({
  player: null,
  players: [],
  question: null,
  correctAnswer: null,
  setPlayer: player => set({player}),
  setPlayers: players => set({players}),
  setQuestion: question => set({question}),
  setCorrectAnswer: correctAnswer => set({correctAnswer})
}))