import React, { Component, useEffect } from 'react'
import { connect } from 'react-redux'
import { View, Text, Button, ScrollView, TouchableOpacity, StyleSheet, FlatList } from 'react-native'
import { receiveDecksAPI, removeAPI} from '../utils/api'
import Deck from './deck'
import {getDecks} from '../actions/index'
import { handleInitialData } from '../actions/index';


class Home extends Component {
    constructor(props) {
        super(props)
        // this.state = {}
        this.refresh = this.refresh.bind(this)
        this.removeAllDecks = this.removeAllDecks.bind(this)
    }

    componentDidMount() {
        receiveDecksAPI()
            .then((results) => {
                console.log(results)
                this.props.dispatch(getDecks(results))
        //         // this.setState(() => ({
        //         //     ...results
        //         // }))
            })
        this.forceUpdate()

        // this.props.handleInitialData();

    }

    refresh = () => {
        receiveDecksAPI()
        .then((results) => {
            console.log(results)
            this.props.dispatch(getDecks(results))
        })
        this.forceUpdate()

    }

    removeAllDecks = () => {
        removeAPI()
        // console.log('remove after', this.props.state)
        // this.props.dispatch(getDecks())
        this.forceUpdate()
    }

    render() {
        const { navigate } = this.props.navigation
        const currentState = this.props.state
        console.log(currentState)
        return (
            <View style={styles.container}>
                <Button
                    title="Refresh"
                    onPress={this.refresh}
                />
                <Text> refresh to update the dick list </Text>
                <Button
                    title="Remove all Decks"
                    onPress={this.removeAllDecks}
                />
                <Text>You will need to restart the app after removing </Text>
                <ScrollView>
                    {Object.keys(currentState).map((deck) => {
                        console.log('key', currentState[deck])
                        return (
                            <Deck
                                key={deck}
                                deck={currentState[deck]}
                                deckDetail={() => navigate(
                                    'DeckDetail',
                                    {
                                        deck: currentState[deck],
                                        toNewCardFunc: () => navigate('NewCard', { deckId: deck })
                                    },
                                )}
                            />
                        )
                    })}
                </ScrollView>
            </View>

        )
    }
}
const styles = StyleSheet.create({
    title: {
        paddingTop: 11,
        paddingBottom: 11,
        fontSize: 26
    },
    container: {
        flex: 1,
        paddingTop: 35,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
})

function mapStateToProps(state) {
    console.log('state', state)
    return {
        state
    }
}


export default connect(mapStateToProps)(Home)

