import { combineReducers } from 'redux'
import {
  ADD_DECK,
  RECEIVE_DECKS
} from '../actions'

// const store = {
//   decks: {
//     React: {
//       title: 'React',
//       questions: [
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
//       questions: [
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
//         noOfCard: 6,
//       }
//     }
//     ]
// }
function decks(state = {}, action) {
  const { decks, deck } = action
  switch (action.type) {
    case RECEIVE_DECKS:
      return {
        ...state,
        'decks': decks,
      }
    case ADD_DECK:
      return {
        ...state,
        [deck.title]: { ...deck }
      }
    default:
      return state
  }
}

function quizzes (state = [], action) {
  switch (action.type) {    
    default:
      return state
  }
}

export default combineReducers({
  decks,
  quizzes,
})
