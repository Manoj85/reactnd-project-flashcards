import { combineReducers } from 'redux'

import { GET_DECKS, GET_DECK, ADD_DECK, UPDATE_DECK, DELETE_DECK } from '../actions/actionTypes'

function decks (state = {}, action) {
    console.log(`decks reducer`)
    const { decks, deck } = action

    switch (action.type) {
        case GET_DECKS:
            return decks

        case ADD_DECK:
            console.log(`ADD_DECK\n${JSON.stringify(state.decks)}`)
            return {
                ...state,
                decks: {
                    ...state.decks, ...deck
                }
            }

        default:
            return state
    }
}

export default combineReducers({
    decks
})