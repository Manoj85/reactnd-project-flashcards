import { GET_DECKS, GET_DECK, ADD_DECK, UPDATE_DECK, DELETE_DECK } from './actionTypes'

export function loadDecks(decks) {
    console.log(`loadDecks\n`)
    console.log(decks)

    return {
        type: GET_DECKS,
        decks
    }
}

export function addDeck (deck) {
    return {
        type: ADD_DECK,
        deck
    }
}