export const ADD_CARD = 'ADD_CARD'
export const ADD_DECK = 'ADD_DECK'
export const REMOVE_DECK = 'REMOVE_DECK'

export function addCard (card, id){
    return {
        type: ADD_CARD,
        card,
        id
    }
}

export function addDeck (deck) {
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