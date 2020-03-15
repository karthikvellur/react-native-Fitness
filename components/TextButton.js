import React from 'react'
import { Text, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'

export default function TextButton ({children, onPress})  {
    return (
        <TouchableWithoutFeedback onPress={onPress}>
            <Text>{children}</Text>
        </TouchableWithoutFeedback>
    )
}