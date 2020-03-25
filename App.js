
import React from 'react'
import { View, Platform, StatusBar } from 'react-native'
import AddEntry from './components/AddEntry'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import History from './components/History'
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import { purple, white } from './utils/colors'
import { createMaterialTopTabNavigator, createBottomTabNavigator } from 'react-navigation-tabs';
import { createAppContainer, StackNavigator } from 'react-navigation';
import Constants from 'expo-constants'
import EntryDetail from './components/EntryDetail'
import Live from './components/Live'

function CustomStatusBar({ backgroundColor, ...props}){
    return (
      <View style={{backgroundColor, height: Constants.statusBarHeight}}>
        <StatusBar translucent backgroundColor={backgroundColor} {...props}/>
      </View>
    )
}

const navigationOptions = {
  navigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ tintColor }) => {
      console.log('inside tabBarIcon')
      const { routeName } = navigation.state;
      if(routeName === 'History')
        return <Ionicons name='ios-bookmarks' size={30} color={tintColor} />
      else if(routeName === 'AddEntry')
        return <FontAwesome name="plus-square" size={30} color={tintColor} />
      else
        return <Ionicons name='ios-bookmarks' size={30} color={tintColor} />
    },
    header: null,
  }),
  tabBarOptions: {
    showIcon: true,
    activeTintColor: Platform.OS === 'ios' ? purple : white,
    style: {
      height: 66,
      backgroundColor: Platform.OS === 'ios' ? white : purple,
      shadowColor: 'rgba(0, 0, 0, 0.24)',
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowRadius: 6,
      shadowOpacity: 1,
    },
  },
}

const TabNavigator = Platform.OS === 'ios' ? createMaterialTopTabNavigator(
  {
    History: History,
    AddEntry: AddEntry,
    Live: Live,
  },
  navigationOptions
): createBottomTabNavigator(
  {
    History: History,
    AddEntry: AddEntry,
    Live: Live,
  },
  navigationOptions
)

const Tabs = createAppContainer(TabNavigator)

export default class App extends React.Component {
  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View style={{ flex: 1 }} >
          <CustomStatusBar backgroundColor={purple} barStyle='light-content'/>
          <Tabs />
        </View>
      </Provider>
    )
  }
}