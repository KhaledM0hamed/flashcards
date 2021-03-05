import React, { Component } from 'react'
import { Text, View, StyleSheet, Button } from "react-native";
import { withNavigation } from "react-navigation";
import { receiveDecksAPI } from "../utils/api";
import { connect } from 'react-redux'

import {getDecks} from '../actions/index'

class DeckDetails extends Component {

    constructor(props) {
        super(props)
        // this.state = {
        //     deck: '',
        //     length: 0,
        //     toNewCardFunction: '',
        // }
        this.refresh = this.refresh.bind(this)
    }

    componentDidMount() {
        this.props.navigation.addListener(
            'didFocus',
            payload => {
              this.forceUpdate();
            }
          );
        // const { navigation } = this.props;
        // const deck = navigation.getParam('deck',)
        // const toNewCardFunction = (navigation.getParam('toNewCardFunction',))

        // this.setState(() => ({
        //     length: deck.cards.length
        // }))
        // this.setState(() => ({
        //     deck,
        //     toNewCardFunction
        // }))
        receiveDecksAPI()
        .then((results) => {
            console.log(results)
            this.props.dispatch(getDecks(results))

        })
        this.forceUpdate()
    }

    refresh() {
        // const { deck } = this.state
        // receiveDecksAPI().then((decks) => {
        //     this.setState(() => ({
        //         deck: decks[deck.deckId],
        //         length: decks[deck.deckId].cards.length
        //     }));
        // })

    }

    render() {
        const { deck, length } = this.props

        return (
            <View style={styles.container}>
                <Text>
                    refresh to load new cards 😄
                </Text>
                <Button
                    title="Refresh"
                    onPress={this.refresh}
                />
                <View >
                    <Text>💥Deck {deck.deckId} has {length} cards💥</Text>
                    <Button
                        title="Add Card"
                        onPress={() => this.props.navigation.navigate(
                            'NewCard',
                            { deck: deck }
                        )}
                    />
                    <Button
                        title="Quiz"
                        onPress={() => this.props.navigation.navigate(
                            'QuizPage',
                            { deck: deck }
                        )}
                    />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        color: 'black'
    }
})

function mapStateToProps(state, { navigation }) {
    const deck = navigation.getParam('deck',)
    const toNewCardFunction = (navigation.getParam('toNewCardFunction',))
    console.log('deck', deck)
    console.log('toNewCardFunction', toNewCardFunction)

    return {
        deck: deck,
        length: deck.cards.length,
        toNewCardFunction: toNewCardFunction,
    }
}

export default withNavigation(connect(mapStateToProps)(DeckDetails))