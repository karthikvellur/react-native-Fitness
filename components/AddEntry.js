import React, { Component } from 'react'
import { 
    View,
    TouchableOpacity,
    Text
 } from 'react-native'
import { getMetricMetaInfo, timeToString, getDailyReminderValue } from '../utils/helpers'
import CustomSlider from './CustomSlider'
import CustomSteppers from './CustomSteppers'
import DateHeader from '../components/DateHeader';
import TextButton from './TextButton'
import { Ionicons } from '@expo/vector-icons'
import { submitEntry,  removeEntry } from '../utils/api'
import { connect } from 'react-redux'
import { addEntry } from '../actions'

function SubmitBtn( { onPress } ){
    return (
        <TouchableOpacity onPress={onPress}>
            <Text>SUBMIT</Text>
        </TouchableOpacity>
    )

}

class AddEntry extends Component{
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
        const { step } = getMetricMetaInfo(metric)
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

        this.props.dispatch(addEntry(
            {[key]: entry}
        ))

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

        submitEntry({key, entry})

        // Clear local notification
    }

    reset = () => {
        const key = timeToString()

        this.props.dispatch(addEntry(
                {[key]: getDailyReminderValue()}
            )
        )

        // Route to Home

        removeEntry(key)
    }

    render(){

        const metaInfo = getMetricMetaInfo()

        console.log('this.props', this.props)
        console.log('this.props.alreadyLogged', this.props.alreadyLogged)

        if(this.props.alreadyLogged){
            return (
                <View>
                    <Ionicons
                        name='ios-happy'
                        size={100}
                    />
                    <Text>You already logged your information for Today</Text>
                    <TextButton onPress={this.reset}>
                        Reset
                    </TextButton>
                </View>
            )
        }

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
                                    ? <CustomSlider
                                        value={value}
                                        onChange={
                                            (value) => this.slide(key, value)
                                        }
                                        {...rest}
                                       /> 
                                    : <CustomSteppers 
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

function mapStateToProps(state){
    const key = timeToString()

    console.log('mapState state', state)

    return {
        alreadyLogged: state[key] && state[key].today === 'undefined'
    }
}

export default connect(mapStateToProps)(AddEntry)