import React, { Component } from 'react'
import {View, Text, StyleSheet, TextInput, KeyboardAvoidingView, Alert} from 'react-native'
import { connect } from 'react-redux'


import { isEmptyOrNull } from '../../utils/helper'
import {purple, blue, gray, white} from '../../utils/colors'
import TextButton from '../shared/TextButton'
import { saveCardToDeck } from '../../utils/api'
import { addCardToDeck } from '../../actions'
import { NavigationActions } from 'react-navigation'

class AddCard extends Component {
    static navigationOptions = ({navigation}) => ({
        title: `Add Card to ${navigation.state.params.deck.title}`
    })

    state = {
        question: '',
        answer: ''
    }

    createCard = () => {
        console.log(`createCard`)
        const { decks } = this.props
        const { deck } = this.props.navigation.state.params

        const current_deck = decks[deck.title];
        const { question, answer } = this.state

        if (isEmptyOrNull(question) || isEmptyOrNull(answer)) {
            return Alert.alert('Card Invalid!!', 'Please enter Question and Answer')
        }
        const card = { question, answer }
        current_deck.questions.push(card)

        saveCardToDeck(current_deck).then(value =>
            this.props.addCardToDeck(current_deck)
        )

        Alert.alert(
            'Card added!',
            'You will be taken back to Deck Detail screen'
        );

        // Reset the state to its initial
        this.resetState()

        // Navigate back to the Detail View
        this.navigateToDeckDetail(current_deck)
    }

    resetState() {
        this.setState({ question: '', answer: '' })
    }

    navigateToDeckDetail (current_deck) {
        this.props.navigation.navigate('DeckDetail', {deck: current_deck})
    }

    render() {
        const { question, answer } = this.state
        return (
            <KeyboardAvoidingView behavior="padding" style={styles.container}>
                <Text style={styles.newCardLabelText}>Question</Text>
                <TextInput style= {styles.input}
                           value={question}
                           underlineColorAndroid="transparent"
                           autoCapitalize="none"
                           onChangeText={(question) => this.setState({question})}/>

                <Text style={styles.newCardLabelText}>Answer</Text>
                <TextInput style= {styles.input}
                           value={answer}
                           underlineColorAndroid="transparent"
                           autoCapitalize="none"
                           onChangeText={(answer) => this.setState({answer})}/>

                <TextButton style={styles.submitBtn} onPress={this.createCard}>
                    Submit
                </TextButton>
            </KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20
    },
    newCardLabelText: {
        color: blue,
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 15,
        marginBottom: 10
    },
    input: {
        height: 40,
        borderColor: gray,
        backgroundColor: white,
        borderWidth: 1,
        borderRadius: 6,
        paddingLeft: 10
    },
    submitBtn: {
        justifyContent: 'flex-end',
        alignSelf: 'center',
        alignItems: 'stretch',
        marginTop: 20,
        padding: 15,
        borderRadius: 8
    }
})

function mapStateToProps ({decks}) {
    return { decks }
}

export default connect(mapStateToProps, {
    addCardToDeck
})(AddCard)