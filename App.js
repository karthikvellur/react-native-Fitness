import React, { Component } from 'react'
import { 
  View,
  StyleSheet
} from 'react-native'
import AddEntry from './components/AddEntry'


export default class App extends Component {

  render(){
    return (
      <View>
          <AddEntry/>
      </View>
    )
  }
}
