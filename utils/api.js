import { AsyncStorage } from 'react-native'
import { setDeckResults, DECK_STORAGE_KEY } from './_deck'


export function getDecks() {
    console.log(`getDecks`)
    return AsyncStorage.getAllKeys().then(keys =>
        AsyncStorage.multiGet(keys.filter(item => /UdaciFlashcards:deck:/.test(item)))
    );
}

export function fetchDeckResults () {
    return AsyncStorage.getItem(DECK_STORAGE_KEY)
        .then(setDeckResults)
}

export function saveDeckTitle(title) {
    console.log(`saveDeckTitle - ${title}`)
    /*
    return AsyncStorage.setItem(
        key,
        JSON.stringify({ title: title, questions: [] })
    );
    */
    AsyncStorage.mergeItem(DECK_STORAGE_KEY, JSON.stringify({
        [title]: { title: title, questions: [] }
    }))
}
