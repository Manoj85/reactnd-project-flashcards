import React, {Component} from 'react'
import {connect} from 'react-redux'
import { View, Text, StyleSheet, Animated, TouchableOpacity } from 'react-native';
import { NavigationActions } from 'react-navigation'
import _ from 'lodash'

import { white, red, blue, gray, lightPurp} from '../../utils/colors'
import { roundToDecimals } from '../../utils/helper'

class Quiz extends Component {
    static navigationOptions = ({navigation}) => ({
        title: `Quiz`
    })

    state = {
        correctAnswerCount: 0,
        totalScorePercentage: 0,
        isQuizComplete: false,
        showAnswer: false,
        currentCardIdx: 0
    }

    componentWillMount() {
        this.animatedValue = new Animated.Value(0)
        this.value = 0
        this.animatedValue.addListener(({ value }) => {
            this.value = value
        })
        this.frontInterpolate = this.animatedValue.interpolate({
            inputRange: [0, 180],
            outputRange: ['0deg', '180deg']
        })
        this.backInterpolate = this.animatedValue.interpolate({
            inputRange: [0, 180],
            outputRange: ['180deg', '0deg']
        })
    }

    componentWillUnmount() {
        this.animatedValue.removeAllListeners()
    }

    resetAnimationFlip = () => {
        this.animatedValue = new Animated.Value(0)
        this.value = 0
        this.animatedValue.addListener(({ value }) => {
            this.value = value
        })
        this.frontInterpolate = this.animatedValue.interpolate({
            inputRange: [0, 180],
            outputRange: ['0deg', '180deg']
        })
        this.backInterpolate = this.animatedValue.interpolate({
            inputRange: [0, 180],
            outputRange: ['180deg', '0deg']
        })
    }

    checkAnswer = ( status ) => {
        const { deck } = this.props.navigation.state.params

        if ( this.state.currentCardIdx < deck.questions.length) {
            if (status === 'yes') {
                this.state.correctAnswerCount = this.state.correctAnswerCount > 0 ? this.state.correctAnswerCount + 1 : 1
                this.setState({
                    currentCardIdx: this.state.currentCardIdx + 1,
                    showAnswer: false
                })
            } else {
                this.state.correctAnswerCount = this.state.correctAnswerCount > 0 ? this.state.correctAnswerCount - 1 : 0
                this.setState({
                    currentCardIdx: this.state.currentCardIdx + 1,
                    showAnswer: false
                })
            }
        }

        if ( this.state.currentCardIdx === deck.questions.length - 1) {
            this.setState({
                isQuizComplete: true,
                showAnswer: false,
                totalScorePercentage: ((this.state.correctAnswerCount) * 100) / (deck.questions.length)
            })
        }

        this.resetAnimationFlip()
    }

    flipCard() {
        const { showAnswer } = this.state

        this.setState({ showAnswer: !showAnswer })

        if(this.value >= 90) {
            Animated.spring(this.animatedValue, {
                toValue: 0,
                friction: 8,
                tension: 10,
            }).start()
        } else {
            Animated.spring(this.animatedValue, {
                toValue: 180,
                friction: 8,
                tension: 10,
            }).start()
        }
    }

    retakeQuiz() {
        this.clearState()
    }

    goBackToDeckView() {
        const { deck } = this.props.navigation.state.params
        this.clearState()
        this.props.navigation.dispatch(NavigationActions.back({deck: deck}))
    }

    clearState() {
        this.setState({
            correctAnswerCount: 0,
            totalScorePercentage: 0,
            isQuizComplete: false,
            showAnswer: false,
            currentCardIdx: 0
        })
    }

    render() {
        const { decks } = this.props
        const { deck } = this.props.navigation.state.params
        const { correctAnswerCount, totalScorePercentage, isQuizComplete, currentCardIdx, showAnswer } = this.state
        const totalQuestions = deck.questions.length

        const frontAnimatedStyle = {
            transform: [
                { rotateY: this.frontInterpolate}
            ]
        }

        const backAnimatedStyle = {
            transform: [
                { rotateY: this.backInterpolate}
            ]
        }

        return (
            <View style={styles.container}>

                {isQuizComplete === false && (
                    <View style={{justifyContent: 'flex-start', marginBottom: 20, justifyContent: 'space-between'}}>
                        <Text style={styles.quizProgress}>Question: {currentCardIdx} OF {totalQuestions}</Text>
                        <Text style={styles.quizProgress}>Score: {correctAnswerCount} OF {totalQuestions}</Text>
                    </View>
                )}

                <View style={styles.flipcontainer}>

                    {isQuizComplete === false && (currentCardIdx < totalQuestions) && (
                        <View>
                            <View style={{alignItems: 'stretch'}}>
                                {/*
                                <Animated.View style={[styles.flipCard]}>
                                    <Text style={styles.flipText}>
                                        { showAnswer ? deck.questions[currentCardIdx].answer : deck.questions[currentCardIdx].question }
                                    </Text>
                                </Animated.View>
                                */}

                                {showAnswer ?

                                    <Animated.View style={[backAnimatedStyle, styles.flipCard]}>
                                        <Text style={styles.flipText}>{deck.questions[currentCardIdx].answer}</Text>
                                    </Animated.View>

                                    :
                                    <Animated.View style={[styles.flipCard, frontAnimatedStyle]}>
                                        <Text style={styles.flipText}>{deck.questions[currentCardIdx].question}</Text>
                                    </Animated.View>
                                }
                            </View>
                            <TouchableOpacity style={{alignItems: 'stretch'}} onPress={() => this.flipCard()}>
                                <Text style={styles.flipTextBtn}>{ showAnswer ? 'Back to Question' : 'Answer' }</Text>
                            </TouchableOpacity>
                        </View>
                    )}

                    {isQuizComplete === true && (
                        <View style={[styles.flipCard]}>

                            <Text style={styles.quizProgress}>Total Correct Answers: {(correctAnswerCount)} </Text>
                            <Text style={styles.quizProgress}>Total Score: {roundToDecimals(totalScorePercentage, 2)} %</Text>

                            <View style={styles.flipBtnContainer}>
                                <TouchableOpacity style={[styles.flipBtn, {backgroundColor: 'green'}]}
                                                  onPress={() => this.retakeQuiz()}>
                                    <Text>RETAKE QUIZ</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.flipBtn, {backgroundColor: 'red'}]}
                                                  onPress={() => this.goBackToDeckView()}>
                                    <Text>Back to Deck</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}
                </View>

                {showAnswer === true && (
                    <View style={styles.flipBtnContainer}>
                        <TouchableOpacity style={[styles.flipBtn, {backgroundColor: 'green'}]}
                                          onPress={() => this.checkAnswer('yes')}>
                            <Text>CORRECT</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.flipBtn, {backgroundColor: 'red'}]}
                                          onPress={() => this.checkAnswer('no')}>
                            <Text>INCORRECT</Text>
                        </TouchableOpacity>
                    </View>
                )}



            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: 'rgba(240,240,240,0.5)',
        shadowColor: 'rgba(0,0,0,0.3)',
        shadowRadius: 5,
        shadowOpacity: 0.3,
        shadowOffset: {
            width: 0,
            height: 0,
        },
        borderColor: 'rgba(230,230,230,1)',
        borderWidth: 2
    },
    flipcontainer: {
        flex: 1,
        alignItems: 'stretch',
        justifyContent: 'center'
    },
    quizProgress: {
        fontSize: 18,
        fontWeight: '500',
        marginBottom: 10,
        marginLeft: 25
    },
    flipCard: {
        width: 320,
        alignItems: 'center',
        justifyContent: 'flex-start',
        backfaceVisibility: 'hidden'
    },
    flipCardBack: {
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
        fontSize: 16,
        position: 'relative'
    },
    flipBtn: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#DDDDDD',
        padding: 10,
        margin: 10,
        width: 300,
        height: 50,
        borderRadius: 10
    },
    flipBtnContainer: {
        padding: 10,
        alignItems: 'center',
        justifyContent: 'flex-end'
    }
})

const mapStateToProps = ({ decks }) => ({ decks })

export default connect(mapStateToProps)(Quiz)