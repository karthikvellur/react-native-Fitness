
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
import { createAppContainer } from 'react-navigation';
import Constants from 'expo-constants'

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
      const { routeName } = navigation.state;
      return routeName === 'History' ? (
        <Ionicons name='ios-bookmarks' size={30} color={tintColor} />
      ) : (
        <FontAwesome name="plus-square" size={30} color={tintColor} />
      )
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
  },
  navigationOptions
): createBottomTabNavigator(
  {
    History: History,
    AddEntry: AddEntry,
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