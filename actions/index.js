import { GET_DECKS, ADD_DECK, ADD_CARD_TO_DECK } from './actionTypes'

export function loadDecks(decks) {
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

export function addCardToDeck ( deck ) {
    return {
        type: ADD_CARD_TO_DECK,
        deck
    }
}