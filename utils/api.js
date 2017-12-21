import { AsyncStorage } from 'react-native'

export const DECK_STORAGE_KEY = 'UdaciFlashcards:deck'

export function getDecks() {
    console.log(`getDecks`)
    return AsyncStorage.getItem(DECK_STORAGE_KEY)
        .then((data) => JSON.parse(data))
}

export function saveDeckTitle(key, title) {
    console.log(`saveDeckTitle \n ${key} - ${title}`)
    return AsyncStorage.setItem(
        key,
        JSON.stringify({ title: title, questions: [] })
    );
}
