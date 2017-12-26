import React, {Component} from 'react'
import {connect} from 'react-redux'
import { View, Text, StyleSheet } from 'react-native';
import {gray} from "../../utils/colors";

class Deck extends Component {

    render() {
        const {deck, decks} = this.props

        const deck_key = deck['title']
        const deck_title = decks[deck_key].title
        const deck_card_count = decks[deck_key].questions.length > 0 ? decks[deck_key].questions.length : 0

        return (
            <View>
                <Text style={styles.deckTitle}>{deck_title}</Text>
                <Text style={styles.deckCardCount}>{deck_card_count} cards</Text>
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
    deck: {
        alignItems: 'center',
        borderWidth: 1,
        borderColor: gray,
        borderRadius: 8,
        marginBottom: 10
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

function mapStateToProps({ decks }) {
    return { decks }
}

export default connect(mapStateToProps)(Deck)