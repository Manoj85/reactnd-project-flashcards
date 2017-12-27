import React, { Component } from 'react'
import {View, Text, StyleSheet, TextInput, KeyboardAvoidingView, Alert} from 'react-native'
import { connect } from 'react-redux'

import {purple, blue, gray, white} from '../../utils/colors'
import TextButton from '../shared/TextButton'
import { saveDeckTitle } from '../../utils/api'
import { addDeck } from '../../actions'
import { NavigationActions } from 'react-navigation'
import DeckList from "./DeckList";
import {isEmptyOrNull} from '../../utils/helper'

class AddDeck extends Component {

    static navigationOptions = ({navigation}) => ({
        title: `Add Deck`
    })

    state = {
        deck_title: ''
    }

    createDeck = () => {
        const { deck_title } = this.state

        if (isEmptyOrNull(deck_title)) {
            return Alert.alert('Error!', 'Desk Title should not be empty')
        }

        saveDeckTitle(deck_title).then(value =>
                this.props.addDeck({
                    [deck_title]: {title: deck_title, questions: []}
                })
            )
            .then(() => this.resetDeskTitle())

        // Navigate back to Deck View
        this.navigateToDeckDetailView()
    }

    resetDeskTitle = () => {
        this.setState(() => ({ 'deck_title': '' }) )
    }

    navigateToDeckDetailView() {
        const { deck_title } = this.state
        const item = {title: deck_title, questions: []}

        this.props.navigation.navigate('DeckDetail', {deck: item})
    }

    render() {
        const { deck_title } = this.state
        return (
            <KeyboardAvoidingView behavior="padding" style={styles.container}>
                <Text style={styles.newDeckText}>Enter the title of your new Deck </Text>
                <TextInput style= {styles.input}
                           placeholder="Deck Title"
                           value={deck_title}
                           underlineColorAndroid="transparent"
                           autoCapitalize="none"
                           onChangeText={(deck_title) => this.setState({deck_title})}/>
                <View style={styles.btnContainer}>
                    <TextButton onPress={this.createDeck}>
                        ADD
                    </TextButton>
                    <TextButton onPress={this.resetDeskTitle}>
                        CLEAR
                    </TextButton>
                </View>
            </KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: white,
        padding: 20
    },
    btnContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end'
    },
    newDeckText: {
        color: blue,
        fontSize: 16,
        marginBottom: 15
    },
    input: {
        height: 40,
        borderColor: gray,
        borderWidth: 1,
        paddingLeft: 10
    }
})

function mapStateToProps ({decks}) {
    return { decks }
}

export default connect(mapStateToProps, {
    addDeck
})(AddDeck)