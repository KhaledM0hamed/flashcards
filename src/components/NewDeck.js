import React, { Component } from 'react';
import { connect } from "react-redux";
import { StyleSheet, View, Button, TextInput, Text } from 'react-native';
import { addDeck } from "../actions/index";
import { addDeckAPI } from '../utils/api'

class NewDeck extends Component {
    constructor (props) {
        super (props)
        this.state = {
            id: '',
            errorMessage: ''
        }
        this.onSubmit = this.onSubmit.bind(this)
    }

    onSubmit (id) {
        const { dispatch } = this.props;
        if (id === '') {
            this.setState(state => ({ ...state, errorMessage: 'deck title is required!' }))
        }
        else {
            dispatch(addDeck(id))
            addDeckAPI(id)
            this.setState(() => ({
                id: ''
            }))
            this.props.navigation.navigate(
                'Home',
                {
                    itemId: 86,
                    otherParam: 'anything you want here',
                }
            )
        }
    }

    render() {
        const { id } = this.state
        return (
            <View style={styles.container}>
                <Text style={styles.header}>
                    Create a new deck
            </Text>
                <TextInput
                    style={styles.input}
                    placeholder="Deck Name"
                    onChangeText={(id) => this.setState({ id })}
                    value={id}
                />
                <br/>
                <Button
                    title='submit'
                    onPress={() => this.onSubmit(id)}
                />
                <Text style={styles.errorMessage}>
                    {this.state.errorMessage}
                </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },

    input: {
        border: '2px solid black',
        borderRadius: '20px',
        width: 200,
        padding: 15,
    },
    header: {
        paddingBottom: 25,
        fontSize: 25,
    },
    errorMessage: {
        color: 'yellow'
    },

})


function mapStateToProps(state, { navigation }) {
    return {
        state,
        navigation
    }
}

export default connect(mapStateToProps)(NewDeck) 