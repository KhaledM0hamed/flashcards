import {ADD_DECK, REMOVE_DECK, ADD_CARD} from '../actions/index'

export default function decks ( state={}, action) {
    switch (action.type) {
        case ADD_DECK:
            return {
                ...state,
                ...action.deck 
            }
        case REMOVE_DECK:
            Object.keys(state).filter( (key) => key !== action.id )
            return {
                ...state
            }
        case ADD_CARD:
            return {
                ...state,
                [id]: {
                    ...state[id],
                    questions: [...state[id].questions].concat(card)
                }
            }
        default:
            return state
    }
}