import React, {Component} from 'react'
import {connect} from 'react-redux'
import { View, Text, StyleSheet, Animated, TouchableOpacity } from 'react-native';
import { NavigationActions } from 'react-navigation'
import _ from 'lodash'

import { white, red, blue, gray, lightPurp} from '../../utils/colors'
import TextButton from '../shared/TextButton'

class Quiz extends Component {
    static navigationOptions = ({navigation}) => ({
        title: `Quiz`
    })

    state = {
        correctAnswerCount: 0,
        isQuizComplete: false,
        showAnswer: false,
        currentCardIdx: 0
    }

    componentWillMount() {
        this.animatedValue = new Animated.Value(0);
        this.value = 0;
        this.animatedValue.addListener(({ value }) => {
            this.value = value;
        })
        this.frontInterpolate = this.animatedValue.interpolate({
            inputRange: [0, 180],
            outputRange: ['0deg', '180deg']
        })
    }

    flipCard() {
        const { showAnswer } = this.state

        this.setState({ showAnswer: !showAnswer })
        Animated.spring(this.animatedValue, {
            toValue: 1
        }).start()
    }

    render() {
        const { decks } = this.props
        const { deck } = this.props.navigation.state.params
        const { correctAnswerCount, isQuizComplete, currentCardIdx, showAnswer } = this.state
        console.log(JSON.stringify(deck))

        const frontAnimatedStyle = {
            transform: [
                { rotateY: this.frontInterpolate}
            ]
        }

        const questionCount = deck.questions.length
        let remainingCount = questionCount

        const currentCard = deck.questions[currentCardIdx]

        return (
            <View style={styles.container}>

                <View style={{justifyContent: 'flex-start', marginBottom: 20}}>
                    <Text style={styles.quizProgress}>{remainingCount}/{questionCount}</Text>
                </View>

                <View style={styles.flipcontainer}>
                    <View style={{alignItems: 'stretch'}}>
                        <Animated.View style={[styles.flipCard, frontAnimatedStyle]}>
                            <Text style={styles.flipText}>
                                { showAnswer ? currentCard.answer : currentCard.question }
                            </Text>
                        </Animated.View>
                    </View>
                    <TouchableOpacity onPress={() => this.flipCard()}>
                        <Text style={styles.flipTextBtn}>{ showAnswer ? 'Back to Question' : 'Answer' }</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.flipBtnContainer}>
                    <TouchableOpacity style={styles.flipBtn} onPress={() => this.flipCard()}>
                        <Text>CORRECT</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.flipBtn} onPress={() => this.flipCard()}>
                        <Text>INCORRECT</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: white
    },
    flipcontainer: {
        flex: 1,
        padding: 10,
        alignItems: 'stretch',
        justifyContent: 'center'
    },
    quizProgress: {
        fontSize: 18,
        fontWeight: '500',
        marginBottom: 10
    },
    flipCard: {
        width: 300,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: white,
        backfaceVisibility: 'hidden'
    },
    flipCardBack: {
        backgroundColor: white,
        position: 'absolute',
        top: 0
    },
    flipText: {
        fontSize: 30,
        alignItems: 'stretch',
        color: blue,
        fontWeight: 'bold'
    },
    flipTextBtn: {
        textAlign: 'center',
        justifyContent: 'center',
        marginTop: 15,
        color: red,
        fontSize: 16
    },
    flipBtn: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    flipBtnContainer: {
        padding: 10,
        alignItems: 'center',
        justifyContent: 'flex-end'
    }
})

function mapStateToProps({ decks }) {
    return { decks }
}

export default connect(mapStateToProps)(Quiz)