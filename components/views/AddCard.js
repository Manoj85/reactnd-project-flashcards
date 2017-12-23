import React, { Component } from 'react'
import {View, Text, StyleSheet, TextInput, KeyboardAvoidingView} from 'react-native'
import { connect } from 'react-redux'

import {purple, blue, gray, white} from '../../utils/colors'
import TextButton from '../shared/TextButton'
import { saveDeckTitle } from '../../utils/api'
import { addDeck } from '../../actions'
import { NavigationActions } from 'react-navigation'
import DeckList from "./DeckList";

class AddCard extends Component {
    static navigationOptions = ({navigation}) => ({
        title: 'Add Card'
    })

    state = {
        deck_card_question: '',
        deck_card_answer: ''
    }

    createCard = () => {
        console.log(`createCard`)
    }

    render() {
        const { deck_card_question, deck_card_answer } = this.state
        return (
            <KeyboardAvoidingView behavior="padding" style={styles.container}>
                <Text style={styles.newCardLabelText}>Question</Text>
                <TextInput style= {styles.input}
                           value={deck_card_question}
                           underlineColorAndroid="transparent"
                           autoCapitalize="none"
                           onChangeText={(deck_card_question) => this.setState({deck_card_question})}/>

                <Text style={styles.newCardLabelText}>Answer</Text>
                <TextInput style= {styles.input}
                           value={deck_card_answer}
                           underlineColorAndroid="transparent"
                           autoCapitalize="none"
                           onChangeText={(deck_card_answer) => this.setState({deck_card_answer})}/>

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

function mapStateToProps (state, { navigation }) {
    return {}
}

export default connect(mapStateToProps, {
})(AddCard)