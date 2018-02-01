import { AsyncStorage } from 'react-native'

const DECKS_STORAGE_KEY = 'decks'

export function submitDeck(deck) {
  return AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify({
    [deck.title]: deck,
  }))
}

export function fetchDecks() {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY).
    then(recv => JSON.parse(recv))
}