import React, { Component } from 'react'
import { 
  Text,
  View,
  TouchableHighlight,
  TouchableNativeFeedback,
  TouchableOpacity,
  TouchableWithoutFeedback
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
