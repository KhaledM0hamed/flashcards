import React , {Component} from 'react'
import { Text, View , StyleSheet, Button} from "react-native";

import { clearLocalNotification, setLocalNotification } from '../utils/helpers';


class QuizPage extends Component {
    constructor (props) {
        super (props)
        this.state = {
            id : '',
            length : 0,
            completed: false,
            cards : '',
            currentCard: 0,
            correctAnswers: 0,
            showingAnswer: false,
        }
        this.restartQuiz = this.restartQuiz.bind(this)
        this.toggleViewAnswer = this.toggleViewAnswer.bind(this)
        this.correct = this.correct.bind(this)
        this.incorrect = this.incorrect.bind(this)
    }

    componentDidMount() {
        const { navigation } = this.props;
        const deck = navigation.getParam('deck') 

        this.setState(() => ({
            deck,
            id : deck.id,
            length : deck.cards.length,
            cards : deck.cards
        }))
    }

    resetNotification() {
        clearLocalNotification()
        .then(setLocalNotification);
    }

    restartQuiz () {
        this.setState({
            currentCard: 0,
            correctAnswers: 0,
            showingAnswer: false,
            completed: false,
            showQuestion: true,
        })
    }

    toggleViewAnswer () {
        this.setState(state => ({
            ...state,
            showingAnswer: !state.showingAnswer
        }))
    }

    correct () {
        const {cards, currentCard,} = this.state

        if(cards[currentCard + 1]) {
            this.setState((prevState) => ({
                ...prevState,
                currentCard: ++prevState.currentCard,
                showingAnswer: false,
                correctAnswers: ++prevState.correctAnswers,
            }))
        } 

        else {
            this.setState(prevState => ({
                ...prevState,
                completed: true,
                showingAnswer: false,
                correctAnswers: ++prevState.correctAnswers,
            }))
            this.resetNotification()
        }
    }

    incorrect () {
        const {cards, currentCard,} = this.state
        if(cards[currentCard+1]) {
            this.setState((prevState) => ({
                ...prevState,
                currentCard: ++prevState.currentCard,
                showingAnswer: false,
            }))
        } 
        else {
            this.setState(prevState => ({
                ...prevState,
                completed: true,
                showingAnswer: false,
            }))
            this.resetNotification()
        }
    }
    render (){
        const { goBack } = this.props.navigation
        const {cards, completed, length, correctAnswers,currentCard,showingAnswer} = this.state

        if (length === 0){
            return (
                <View style = {[styles.container]}>
                    <Text> 
                        cards not found
                    </Text>
                </View>
            )
        }
        if (completed === true) {
            return (
                <View style = {[styles.container]}>
                    <Text>Quiz Completed</Text>
                    <Text>{ correctAnswers / length * 100 + '% correct' }</Text>
                    <Button 
                        title='Back to Deck'
                        onPress={() => goBack()}
                    />
                    <Button
                        title="Play Again"
                        onPress={() => this.restartQuiz()}
                    />
                </View>
            )
        }

        if (!completed) {
            return (
                <View>
                    <Text>Card {currentCard + 1} of {length}</Text>
                    {!showingAnswer ? 
                        <Text>Question: {cards[currentCard].question}</Text> :
                        <Text>Answer: {cards[currentCard].answer}</Text>
                    }
                    {currentCard > 0 && 
                        <Text>{currentCard > 0 && (correctAnswers / currentCard) * 100 + '% correct' }</Text>
                    }
                    <Button 
                        title={"View " + (showingAnswer ? 'Question' : 'Answer')}
                        onPress={this.toggleViewAnswer}
                    />
                    <Button
                        title="Correct"
                        onPress={this.correct}
                    />
                    <Button 
                        title="Incorrect"
                        onPress={this.incorrect}
                    />
                </View>
            )
        }
    }
}

const styles = StyleSheet.create({
    container : {
        flex : 1,
        justifyContent : "flex-start",
        alignItems : "center"
    }
})


export default QuizPage