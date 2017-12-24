import React, {Component} from 'react'
import {connect} from 'react-redux'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import {gray, lightPurp} from '../../utils/colors'
import Deck from './Deck'
import TextButton from '../shared/TextButton'

class DeckDetail extends Component {
    static navigationOptions = ({navigation}) => ({
        title: navigation.state.params.deck.title
    })


    addCardToDeck = () => {
        console.log(`addCardToDeck`)
        const { deck } = this.props.navigation.state.params
        this.props.navigation.navigate('AddCard', { deck });
    }

    startQuiz = () => {
        console.log(`startQuiz\n`)
        const { deck } = this.props.navigation.state.params

        console.log(`${JSON.stringify(deck)}`)
        this.props.navigation.navigate('Quiz', { deck })
    }

    render() {
        console.log(`DeckDetail`)
        // console.log(JSON.stringify(this.props))

        const { decks } = this.props
        const { deck } = this.props.navigation.state.params

        let isTakeQuizDisabled = deck.questions.length === 0

        return (
            <View style={styles.container}>
                <Deck deck={deck} />

                <View style={styles.buttonContainer}>
                    <View style={{alignItems: 'stretch'}}>
                        <TextButton style={styles.button} onPress={this.addCardToDeck}>
                            Add Card
                        </TextButton>
                        <TextButton style={styles.button} onPress={this.startQuiz} disabled={isTakeQuizDisabled}>
                            Take Quiz
                        </TextButton>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        alignItems: 'stretch',
        justifyContent: 'flex-start'
    },
    buttonContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        borderWidth: 0
    },
    button: {
        alignItems: 'stretch',
        backgroundColor: lightPurp
    }
})

function mapStateToProps( {decks}) {
    return { decks }
}

export default connect(mapStateToProps, {})(DeckDetail)