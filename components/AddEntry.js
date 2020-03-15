import React, { Component } from 'react'
import { 
    View,
    TouchableOpacity,
    Text
 } from 'react-native'
import { getMetricMetaInfo, timeToString } from '../utils/helpers'
import Slider from '../components/Slider'
import Steppers from '../components/Steppers'
import DateHeader from '../components/DateHeader';

function SubmitBtn( { onPress } ){
    return (
        <TouchableOpacity onPress={onPress}>
            <Text>SUBMIT</Text>
        </TouchableOpacity>
    )

}

export default class AddEntry extends Component{
    state = {
        run: 0,
        bike: 0,
        swim: 0,
        sleep: 0,
        eat: 0,
    }

    increment = (metric) => {
        const { max, step } = getMetricMetaInfo(metric)

        this.setState(
            (state) => {
                const count = state[metric] + step

                return {
                    ...state,
                    [metric]: count > max ? max : count
                }
            }
        )
    }

    decrement = (metric) => {
        this.setState(
            (state) => {
                const count = state[metric] - step

                return {
                    ...state,
                    [metric]: count < 0 ? 0 : count
                }
            }
        )
    }
    
    slide = (metric, value) => {
        this.setState(
            () => (
                {
                    [metric]: value
                }
            )
        )
    }

    submit = () => {
        const key = timeToString()
        const entry = this.state

        // update Redux

        this.setState(
            () => (
                {
                    run: 0,
                    bike: 0,
                    swim: 0,
                    sleep: 0,
                    eat: 0,                    
                }
            )
        )

        // Navigate to home

        // Save to 'DB'

        // Clear local notification
    }

    render(){

        const metaInfo = getMetricMetaInfo()

        console.log('metaInfo', metaInfo)

        return(
            <View>
                <DateHeader date={
                    (new Date()).toLocaleDateString()
                }/>

                <Text>
                    {JSON.stringify(this.state)}
                </Text>

                {Object.keys(metaInfo).map(
                    (key) => {
                        
                        const { getIcon, type, ...rest } = metaInfo[key]
                        
                        const value = this.state[key]
                        console.log('value', value)

                        return (
                            <View key={key}>
                                {getIcon()}
                                {
                                    type === 'slider'
                                    ? <Slider
                                        value={value}
                                        onChange={
                                            (value) => this.slide(key, value)
                                        }
                                        {...rest}
                                       /> 
                                    : <Steppers 
                                        value={value}
                                        onIncrement={
                                            () => this.increment(key)
                                        }
                                        onDecrement={
                                            () => this.decrement(key)
                                        }
                                        />
                                }
                            </View>
                        )
                    }
                )}
                <SubmitBtn onPress={this.submit}/>
            </View>
        )
    }
}
