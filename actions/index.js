export const RECEIVE_DESKS = 'RECEIVE_DESKS'
export const ADD_DECK = 'ADD_DECK'

export function receiveDecks (decks) {
    return {
        type: RECEIVE_DESKS,
        decks,
    }
}

export function addDeck (deck) {
    return {
        type: ADD_DECK,
        deck,
    }
}