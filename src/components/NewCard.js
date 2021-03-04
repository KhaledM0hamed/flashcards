import React from 'react';
import { connect } from "react-redux";
import { StyleSheet, View, TextInput, Button, Text, KeyboardAvoidingView, } from 'react-native';
import { addCardAPI, addDeckAPI, getDecksAPI } from '../utils/api'
import { withNavigation } from "react-navigation";

class NewCard extends React.Component {
    constructor (props) {
        super (props)
        this.state = {
            question: '',
            answer: '',
        }
        this.submitForm = this.submitForm.bind(this)
    }

    componentDidMount() {
        const { navigation } = this.props;
        const deck = navigation.getParam('deck')
        this.setState(() => ({
            deck,
        }))
    }

    submitForm (state) {
        const { navigation } = this.props;
        const { question, answer, deck } = this.state

        if (!state.question || !state.answer) {
            this.setState(state => ({
                ...state,
                errorMessage: 'Your card needs a question and answer!'
            }))
        }
        const card = { question: question, answer: answer }
        addCardAPI(deck.deckId, card)
        navigation.goBack()
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.header}>
                💢Add a new Quiz💢
                </Text>
                <TextInput
                    onChangeText={(question) => this.setState({ question })}
                    value={this.state.question}
                    style={styles.input}
                    placeholder='question'
                />
                <TextInput
                    placeholder='answer'
                    value={this.state.answer}
                    style={styles.input}
                    onChangeText={(answer) => this.setState({ answer })}
                />
                <Button
                    onPress={() => this.submitForm(this.state)}
                    title='submit'
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
        // border: '2px solid black',
        // borderRadius: '20px',
        width: 200,
        padding: 15,
    },
    errorMessage: {
        color: 'yellow'
    },
    header: {
        fontSize: 25,
        paddingBottom: 25,
    },
})


function mapStateToProps(state, { navigation }) {
    return {
        state,
        navigation
    }
}

export default withNavigation(connect(mapStateToProps)(NewCard)) 