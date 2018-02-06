import { AsyncStorage } from 'react-native'

const DECKS_STORAGE_KEY = 'decks'

export function saveDeckTitle(deck) {
  return AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify({
    [deck.title]: deck,
  }))
}

export function getDecks() {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY).
    then(recv => JSON.parse(recv))
}

export function removeDeck(deckId) {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then(results => {
      const data = JSON.parse(results)
      data[deckId] = undefined
      delete data[deckId]
      AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(data))
    })
}

export function addCardToDeck(deckId, card) {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then(results => {
      const data = JSON.parse(results)
      const deck = data[deckId]
      const cards = deck.cards || []
      const newData = {
        ...data,
        [deckId]: { ...deck, cards: [...cards, { question: card.question, answer: card.answer }] }
      }
      AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(newData))
    })
} 