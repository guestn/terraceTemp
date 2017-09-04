import React from 'react';
import { bool } from 'prop-types';
import { Platform } from 'react-native';
import { EvilIcons } from '@expo/vector-icons';
import { TabNavigator, TabBarBottom } from 'react-navigation';


import HomeScreen from '../screens/HomeScreen';
import GraphScreen from '../screens/GraphScreen';
import SettingsScreen from '../screens/SettingsScreen';


export default TabNavigator(
  {
    Graph: {
      screen: GraphScreen,
    },
    Home: {
      screen: HomeScreen,
    },

    Settings: {
      screen: SettingsScreen,
    },
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused }) => {
        const { routeName } = navigation.state;
        let iconName;
        switch (routeName) {
          case 'Home':
            iconName = Platform.OS === 'ios'
              ? 'check'
              : 'check';
            break;
          case 'Graph':
            iconName = Platform.OS === 'ios'
              ? 'chart'
              : 'chart';
            break;
          case 'Settings':
            iconName = Platform.OS === 'ios'
              // ? `ios-options${focused ? '' : '-outline'}`
              ? 'gear'
              : 'gear';
            break;
          default:
            return null;
        }
        return (
          <EvilIcons
            name={iconName}
            size={40}
            style={{ marginBottom: -3 }}
            color={focused ? 'rgba(100,100,100,0.2)' : 'rgba(100,100,100,0.6)'}
          />
        );
      },
    }),
    tabBarOptions: {
      activeTintColor: 'red',
      tintColor: 'black',
      inactiveTintColor: '#eee',
      showIcon: true,
      showLabel: false,
      style: {
        backgroundColor: 'rgba(255,255,255,0.2)',
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 101,
        padding: 0,
      },
    },
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    animationEnabled: true,
    swipeEnabled: true,
  },
);

TabNavigator.propTypes = {
  focused: bool,
};
