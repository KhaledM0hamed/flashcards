import React, { Component } from 'react'
import { Text, View, StyleSheet, Button } from "react-native";
import { withNavigation } from "react-navigation";
import { receiveDecksAPI } from "../utils/api";



class DeckDetails extends Component {

    constructor(props) {
        super(props)
        this.state = {
            deck: '',
            length: 0,
            toNewCardFunction: '',
        }
        this.refresh = this.refresh.bind(this)
    }

    componentDidMount() {
        const { navigation } = this.props;
        const deck = navigation.getParam('deck',)
        const toNewCardFunction = (navigation.getParam('toNewCardFunction',))

        this.setState(() => ({
            length: deck.cards.length
        }))
        this.setState(() => ({
            deck,
            toNewCardFunction
        }))
    }

    refresh() {
        const { deck } = this.state
        receiveDecksAPI().then((decks) => {
            this.setState(() => ({
                deck: decks[deck.deckId],
                length: decks[deck.deckId].cards.length
            }));
        })

    }

    render() {
        const { deck, length } = this.state

        return (
            <View style={styles.container}>
                <Text>
                    refresh to load new cards 😄
                </Text>
                <Button
                    title="Refresh"
                    onPress={this.refresh}
                />
                <br />
                <View >
                    <Text>💥Deck {deck.deckId} has {length} cards💥</Text>
                    <Button
                        title="Add Card"
                        onPress={() => this.props.navigation.navigate(
                            'NewCard',
                            { deck: deck }
                        )}
                    />
                    <br />
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


export default withNavigation(DeckDetails)