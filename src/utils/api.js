import AsyncStorage from '@react-native-community/async-storage'

export const DECKS_STORAGE_KEY = 'UdacityMobileFlashCard'

export async function receiveDecksAPI () {
    const result = JSON.parse(await AsyncStorage.getItem(DECKS_STORAGE_KEY))
    return result
}

export async function receiveDeckAPI(deckId) {
    const decks = await receiveDecksAPI()
    console.log(deckId)
    console.log(decks['js'])
    return decks[deckId]
}

export function addDeckAPI (deckId) {
    return AsyncStorage.mergeItem(
        DECKS_STORAGE_KEY,
        JSON.stringify({
            [deckId] : {
                deckId,
                cards : []
            }
        })
    )
}

export async function removeDeckAPI(deckId) {
    console.log('shit')
    const decks = await receiveDecksAPI()
    const { [deckId] : value , ...withoutId } = decks;
    AsyncStorage.setItem(
        DECKS_STORAGE_KEY,
        JSON.stringify(withoutId)
    )
}

export async function addCardAPI (deckId, card) {
    
    const deck = await receiveDeckAPI(deckId)
    console.log('deckid', deckId)
    deck.cards.push(card)
    return AsyncStorage.mergeItem(
        DECKS_STORAGE_KEY,
        JSON.stringify({
            [deckId] : deck
        })
    )
} 

export async function removeAPI () {
    return await AsyncStorage.removeItem(DECKS_STORAGE_KEY)
}