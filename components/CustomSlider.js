import React, { Component } from 'react'
import { Text, View, Slider } from 'react-native'

export default function CustomSlider( { max, min, unit, step, value, onChange } ){
    return(
        <View>
            <Slider
                step={step}
                value={value}
                maximumValue={max}
                minimumValue={min}
                onValueChange={onChange}
            />
            <View>
                <Text>{value}</Text>
                <Text>{unit}</Text>
            </View>
        </View>
    )
}