import React from 'react'
import { Text, View, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
import { FontAwesome, Entypo } from '@expo/vector-icons'

export default function CustomSteppers({max, unit, step, value, onIncrement, onDecrement}){
    return(
        <View>
            <View>
                <TouchableWithoutFeedback onPress={onDecrement}>
                    <FontAwesome name='minus' size={30} color={'black'}/>
                </TouchableWithoutFeedback>

                <TouchableWithoutFeedback onPress={onIncrement}>
                    <FontAwesome name='plus' size={30} color={'black'}/>
                </TouchableWithoutFeedback>
            </View>
            <View>
                <Text>{value}</Text>
                <Text>{unit}</Text>
            </View>
        </View>
    )
}