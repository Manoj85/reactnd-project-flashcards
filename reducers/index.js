import { combineReducers } from 'redux'

import { GET_DECKS, ADD_DECK, ADD_CARD_TO_DECK } from '../actions/actionTypes'

function decks (state = {}, action) {
    const { decks, deck, card } = action

    switch (action.type) {
        case GET_DECKS:
            return decks

        case ADD_DECK:
            return {
                ...state,
                ...deck
            }

        case ADD_CARD_TO_DECK:
            return {
                ...state,
                [deck.title]: deck
            }

        default:
            return state
    }
}

export default combineReducers({
    decks
})