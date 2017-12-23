import React from 'react'
import { Text, TouchableOpacity, StyleSheet, Platform } from 'react-native'
import { purple, white, gray } from '../../utils/colors'

export default function TextButton ({ children, onPress, style = {}, disabled }) {
    return (
        <TouchableOpacity
            style={[Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtn, styles.container, style]}
            onPress={onPress}
            disabled={disabled}
            >
            <Text style={[styles.submitBtnText]}>{children}</Text>
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
        fontSize: 20,
        textAlign: 'center',
        textAlignVertical: 'center'
    },
    container: {
        marginTop: 10
    }
})