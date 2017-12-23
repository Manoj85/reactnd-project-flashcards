
// Utilities for backfilling the deck.

import { AsyncStorage } from 'react-native'
import { isEmpty } from './helper'

export const DECK_STORAGE_KEY = 'UdaciFlashcards:deck'

function setDummyData () {
    console.log(` ==== setDummyData ==== \n`)
    let dummyData = {
        "React": {
            "title": "React",
            "questions": [
                {
                    "question": "What is React?",
                    "answer": "A library for managing user interfaces"
                },
                {
                    "question": "Where do you make Ajax requests in React?",
                    "answer": "The componentDidMount lifecycle event"
                }
            ]
        },
        "JavaScript": {
            "title": "JavaScript",
            "questions": [
                {
                    "question": "What is a closure?",
                    "answer": "The combination of a function and the lexical environment within which that function was declared."
                }
            ]
        }
    }

    AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(dummyData))

    return dummyData
}

export function setDeckData (decks) {
    console.log(` ==== setDeckData ==== \n`)
    return decks
}

export function setDeckResults (results) {
    console.log(` ==== setDeckResults ==== \n`)
    const parsedResults = results === null ? {} : JSON.parse(results)
    return isEmpty(parsedResults)
        ? setDummyData()
        : setDeckData(parsedResults)
}