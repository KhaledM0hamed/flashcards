import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { withNavigation } from "react-navigation";

class Deck extends Component {
    constructor (props) {
        super (props)
    }

    render() {
        const { deckDetail } = this.props
        const { deckId, cards } = this.props.deck

        return (
            <View>
                <TouchableOpacity
                    style={styles.deck}
                    onPress={() => deckDetail()}>
                    <Text>{deckId}</Text>
                    <Text>Number of cards is {cards.length}</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    deck: {
        // border: '2px solid black',
        // borderRadius: '20px',
        width: 300,
        flexDirection: 'column',
        paddingTop: 20,
        paddingBottom: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
})


export default withNavigation(Deck)