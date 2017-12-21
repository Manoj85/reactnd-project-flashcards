import React, { Component } from 'react'
import { View, Text, StyleSheet, TextInput, KeyboardAvoidingView } from 'react-native'
import {purple, blue, gray, white} from '../utils/colors'

class NewDeck extends Component {
    state = {
        deskName: ''
    }

    handleTextChange = (deskName) => {
        this.setState(() => ({ deskName }) )
    }

    render() {
        const { deckName } = this.state;
        return (
            <KeyboardAvoidingView behavior="padding" style={styles.container}>
                <Text style={styles.newDeckText}>Enter the title of your new Deck </Text>
                <TextInput style= {styles.input}
                           placeholder="Deck Title"
                           value={deckName}
                           underlineColorAndroid="transparent"
                           autoCapitalize="none"
                           onChangeText={this.handleTextChange}/>
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

export default NewDeck