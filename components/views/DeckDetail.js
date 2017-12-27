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
        const { deck } = this.props.navigation.state.params
        this.props.navigation.navigate('AddCard', { deck });
    }

    startQuiz = () => {
        const { deck } = this.props.navigation.state.params
        this.props.navigation.navigate('Quiz', { deck })
    }

    render() {
        const { decks } = this.props
        const { deck } = this.props.navigation.state.params

        let isTakeQuizDisabled = deck.questions.length === 0

        return (
            <View style={styles.container}>
                <View>
                    <Text style={styles.deckTitle}>{deck.title}</Text>
                    <Text style={styles.deckCardCount}>{deck.questions.length > 0 ? deck.questions.length : 0} cards</Text>
                </View>

                <View style={styles.buttonContainer}>
                    <View style={{alignItems: 'stretch'}}>
                        <TextButton style={[styles.button, {backgroundColor: 'blue'}]} onPress={this.addCardToDeck}>
                            Add Card
                        </TextButton>
                        <TextButton style={[styles.button, {backgroundColor: 'orange'}]} onPress={this.startQuiz} disabled={isTakeQuizDisabled}>
                            Start Quiz
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
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        margin: 10,
        width: 300,
        height: 50,
        borderRadius: 10
    },
    deckTitle: {
        marginTop: 10,
        marginBottom: 5,
        fontSize: 16,
        color: '#333',
        fontWeight: '600',
        textAlign: 'center'
    },
    deckCardCount: {
        marginTop: 5,
        marginBottom: 10,
        fontSize: 13,
        color: '#999',
        fontWeight: '300',
        textAlign: 'center'
    }
})

function mapStateToProps( {decks}) {
    return { decks }
}

export default connect(mapStateToProps, {})(DeckDetail)