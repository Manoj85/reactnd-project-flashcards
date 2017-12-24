import React, {Component} from 'react'
import {connect} from 'react-redux'
import { View, Text, StyleSheet } from 'react-native';
import { NavigationActions } from 'react-navigation'
import _ from 'lodash'

import {gray, lightPurp} from '../../utils/colors'
import TextButton from '../shared/TextButton'

class Quiz extends Component {
    static navigationOptions = ({navigation}) => ({
        title: `Quiz`
    })

    render() {
        const { decks } = this.props
        const { deck } = this.props.navigation.state.params
        console.log(JSON.stringify(deck))

        const questionCount = deck.questions.length
        let remainingCount = questionCount


        return (
            <View style={styles.container}>

                <View style={{flex: 1, justifyContent: 'flex-start', marginBottom: 20}}>
                    <Text style={styles.quizProgress}>{remainingCount}/{questionCount}</Text>
                </View>

                <View style={{flex: 1, justifyContent: 'flex-start', marginTop: 5}}>
                {!!deck.questions && (_.map(deck.questions, (item) => {
                    return (
                        <Text style={styles.deckTitle} key={item.question}>{item.question}</Text>
                    )
                }))
                }
                </View>

                <View style={styles.buttonContainer}>
                    <View style={{alignItems: 'stretch'}}>
                        <TextButton style={styles.button} onPress={this.addCardToDeck}>
                            CORRECT
                        </TextButton>
                        <TextButton style={styles.button} onPress={this.startQuiz}>
                            INCORRECT
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
        alignItems: 'stretch'
    },
    quizProgress: {
        alignItems: 'flex-start',
        fontSize: 18,
        fontWeight: '500',
        marginBottom: 10
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

function mapStateToProps({ decks }) {
    return { decks }
}

export default connect(mapStateToProps)(Quiz)