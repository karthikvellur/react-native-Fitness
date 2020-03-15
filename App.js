import React, { Component } from 'react'
import { Text, View } from 'react-native'
import AddEntry from './components/AddEntry'
import Slider from './components/Slider'
import Steppers from './components/Steppers'

export default class App extends Component {
  render(){
    return (
      <View>
        <AddEntry/>
      </View>
    )
  }
}
