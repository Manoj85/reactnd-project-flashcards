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
                <Deck deck={deck} />

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
    }
})

function mapStateToProps( {decks}) {
    return { decks }
}

export default connect(mapStateToProps, {})(DeckDetail)