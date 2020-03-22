import React from 'react'
import { Text, TouchableWithoutFeedback, StyleSheet } from 'react-native'
import { purple } from '../utils/colors'

export default function TextButton ({children, onPress, style = {}})  {
    return (
        <TouchableWithoutFeedback onPress={onPress}>
            <Text style={[styles.reset, style]}>{children}</Text>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create(
    {
        reset: {
            textAlign: 'center',
            color: purple,
        }
    }
)