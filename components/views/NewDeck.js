import React, { Component } from 'react'
import {View, Text, StyleSheet, TextInput, KeyboardAvoidingView} from 'react-native'
import {purple, blue, gray, white} from '../../utils/colors'
import TextButton from '../shared/TextButton'

class NewDeck extends Component {
    state = {
        deckTitle: ''
    }

    handleTextChange = (deckTitle) => {
        this.setState(() => ({ deckTitle }) )
    }

    createDeck = () => {
        const { deckTitle } = this.state
    }

    reset = () => {
        this.setState(() => ({ 'deckTitle': '' }) )
    }

    render() {
        const { deckTitle } = this.state
        return (
            <KeyboardAvoidingView behavior="padding" style={styles.container}>
                <Text style={styles.newDeckText}>Enter the title of your new Deck </Text>
                <TextInput style= {styles.input}
                           placeholder="Deck Title"
                           value={deckTitle}
                           underlineColorAndroid="transparent"
                           autoCapitalize="none"
                           onChangeText={this.handleTextChange}/>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end'}}>
                    <TextButton onPress={this.createDeck}>
                        ADD
                    </TextButton>
                    <TextButton onPress={this.reset}>
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

export default NewDeck