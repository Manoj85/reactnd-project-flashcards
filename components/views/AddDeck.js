import React, { Component } from 'react'
import {View, Text, StyleSheet, TextInput, KeyboardAvoidingView} from 'react-native'
import { connect } from 'react-redux'

import {purple, blue, gray, white} from '../../utils/colors'
import TextButton from '../shared/TextButton'
import { saveDeckTitle } from '../../utils/api'
import { addDeck } from '../../actions'
import { guid } from '../../utils/helper'

class AddDeck extends Component {
    state = {
        deck_title: ''
    }

    handleTextChange = (deck_title) => {
        this.setState(() => ({ deck_title }) )
    }

    createDeck = () => {
        console.log(`createDeck`)
        const { deck_title } = this.state

        saveDeckTitle(deck_title)
            .then(() => {
                this.props.addDeck({
                    [deck_title]: {title: deck_title, questions: []}
                })
                this.resetDeskTitle()
            });

        // Navigate back to Deck View or Deck List
    }

    resetDeskTitle = () => {
        this.setState(() => ({ 'deck_title': '' }) )
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
                           onChangeText={this.handleTextChange}/>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end'}}>
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
        padding: 20
    },
    newDeckText: {
        color: blue,
        backgroundColor: white,
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

function mapStateToProps (state, { navigation }) {
    return {}
}

export default connect(mapStateToProps, {
    addDeck,
})(AddDeck)