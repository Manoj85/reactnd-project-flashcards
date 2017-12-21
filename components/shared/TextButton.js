import React from 'react'
import { Text, TouchableOpacity, StyleSheet, Platform } from 'react-native'
import { purple, white } from '../../utils/colors'

export default function TextButton ({ children, onPress, style = {} }) {
    return (
        <TouchableOpacity
            style={[Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtn, styles.container]}
            onPress={onPress}>
            <Text style={[styles.submitBtnText, style]}>{children}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    iosSubmitBtn: {
        backgroundColor: purple,
        padding: 10,
        borderRadius: 7
    },
    AndroidSubmitBtn: {
        backgroundColor: purple,
        padding: 10,
        paddingTop: 5,
        paddingBottom: 5,
        borderRadius: 4,
        alignSelf: 'flex-end',
        justifyContent: 'center',
        alignItems: 'flex-end'

    },
    submitBtnText: {
        color: white,
        fontSize: 16,
        textAlign: 'center',
        textAlignVertical: 'center'
    },
    container: {
        alignItems: 'center',
        marginTop: 10
    }
})