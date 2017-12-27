import { AsyncStorage } from 'react-native'
import { setDeckResults, DECK_STORAGE_KEY } from './_deck'

export function fetchDeckResults () {
    return AsyncStorage.getItem(DECK_STORAGE_KEY)
        .then(setDeckResults)
}

export function saveDeckTitle(title) {
    return AsyncStorage.mergeItem(DECK_STORAGE_KEY, JSON.stringify({
        [title]: { title: title, questions: [] }
    }))
}

export function saveCardToDeck(deck) {
    const key = deck.title
    return AsyncStorage.mergeItem(DECK_STORAGE_KEY, JSON.stringify({
        [key]: deck
    }))
}
