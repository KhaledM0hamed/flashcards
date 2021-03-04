import {ADD_DECK, REMOVE_DECK, ADD_CARD, GET_DECK, GET_DECKS} from '../actions/index'

export default function decks ( state={}, action) {
    switch (action.type) {

        case ADD_DECK:
            return {
                ...state,
                ...action.deck 
            }

        case REMOVE_DECK:
            const deckId = action.id
            const { [deckId] : value , ...withoutId } = state;
            return  {
                ...withoutId
            }

        case ADD_CARD:
            return {
                ...state,
                [action.id]: {
                    ...state[action.id],
                    cards: [...state[action.id].cards].concat(action.card)
                }
            }
        
        case GET_DECK:
            return {
                ...state,
                ...action.deck 
            }

        case GET_DECKS:
            return {
                ...state,
                ...action.decks
            }
        default:
            return state
    }
}