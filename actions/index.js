import { GET_DECKS, GET_DECK, ADD_DECK, UPDATE_DECK, DELETE_DECK } from './actionTypes'

export function loadDecks(data) {
    console.log(`actions - loadDecks \n ${JSON.stringify(data)}`)
    return {
        type: GET_DECKS,
        decks: data
    }
}

export function addDeck (deck) {
    return {
        type: ADD_DECK,
        deck
    }
}