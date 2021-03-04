export const ADD_CARD = 'ADD_CARD'
export const ADD_DECK = 'ADD_DECK'
export const REMOVE_DECK = 'REMOVE_DECK'
export const GET_DECK = 'GET_DECK'
export const GET_DECKS = 'GET_DECKS'

export function addCard (data){
    const {id, card} = data
    return {
        type: ADD_CARD,
        card,
        id
    }
}

export function addDeck (id) {
    const deck = {
        [id] : {
            id,
            cards : []
        }
    }

    return {
        type: ADD_DECK,
        deck
    }
}

export function removeDeck (id) {
    return {
        type : REMOVE_DECK,
        id
    }
}

export function getDeck ( deck ) {
    return {
        type: GET_DECK,
        deck
    }
}

export function getDecks ( decks ) {
    return {
        type: GET_DECK,
        decks
    }
}