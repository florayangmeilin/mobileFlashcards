import { combineReducers } from 'redux'
import {
  ADD_DECK,
  RECEIVE_DECKS,
  DELETE_DECK,
  ADD_CARD
} from '../actions'

// const store = {
//   decks: {
//     React: {
//       title: 'React',
//       cards: [
//         {
//           question: 'What is React?',
//           answer: 'A library for managing user interfaces'
//         },
//         {
//           question: 'Where do you make Ajax requests in React?',
//           answer: 'The componentDidMount lifecycle event'
//         }
//       ]
//     },
//     JavaScript: {
//       title: 'JavaScript',
//       cards: [
//         {
//           question: 'What is a closure?',
//           answer: 'The combination of a function and the lexical environment within which that function was declared.'
//         }
//       ]
//     }
//   },
//   quizzes:
//     [{
//       date: '2018-1-31',
//       detail: {
//         deck: 'React',
//         correct: 12,
//         incorrect: 2,
//         noOfCard: 14,
//       }
//     },
//     {
//       date: '2018-1-28',
//       detail: {
//         deck: 'Javascript',
//         correct: 4,
//         incorrect: 2,
.0//       }
//     }
//     ]
// }
function decks(state = {}, action) {
  switch (action.type) {
    case RECEIVE_DECKS:
      return {
        ...state,
        ...action.decks,
      }
    case ADD_DECK:
      return {
        ...state,
        [action.deck.title]: { ...action.deck }
      }
    case DELETE_DECK:
      const newState = { ...state }
      delete newState[action.deckId]
      return newState
    case ADD_CARD:
      const deck = state[action.deckId]
      const cards = deck.cards || []
      return {
        ...state,
        [action.deckId]: { ...deck, cards: [...cards, { question: action.card.question, answer: action.card.answer }] }
      }
    default:
      return state
  }
}

function quizzes(state = [], action) {
  switch (action.type) {
    default:
      return state
  }
}

export default combineReducers({
  decks,
  quizzes,
})
