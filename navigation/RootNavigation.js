// import { Notifications } from 'expo';
import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
// import registerForPushNotificationsAsync from '../api/registerForPushNotificationsAsync';

const RootStackNavigator = StackNavigator(
  {
    Main: {
      screen: MainTabNavigator,
    },
  },
  {
    navigationOptions: () => ({
      headerTitleStyle: {
        fontWeight: 'normal',
        fontFamily: 'space-mono',
      },
      headerStyle: {
        position: 'absolute',
        backgroundColor: 'rgba(255,255,255,0.4)',
        zIndex: 100,
        top: 0,
        left: 0,
        right: 0,
      },
      headerMode: 'float',
    }),
  },
);

export default class RootNavigator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      switchOn: false,
    };
  }


  componentDidMount() {
    // this.switchOn(this.state.switchOn)
    // this._notificationSubscription = this._registerForPushNotifications();
  }

  componentWillUnmount() {
  //  this._notificationSubscription && this._notificationSubscription.remove();
  }


  onChangeSwitch = (value) => {
    this.setState({ switchOn: value });
  }

  switchOn = (value) => {
    console.log('switchOn', value);
    return value;
  }


  registerForPushNotifications() {
    // Send our push token over to our backend so we can receive notifications
    // You can comment the following line out if you want to stop receiving
    // a notification every time you open the app. Check out the source
    // for this function in api/registerForPushNotificationsAsync.js
    // registerForPushNotificationsAsync();

    // Watch for incoming notifications
    // this.notificationSubscription = Notifications.addListener(
    //   this.handleNotification
    // );
  }

  handleNotification = ({ origin, data }) => {
    console.log(`Push notification ${origin} with data: ${JSON.stringify(data)}`);
  };

  render() {
    return (
      <RootStackNavigator
        screenProps={{
          switchOn: this.state.switchOn,
          onChangeSwitch: this.onChangeSwitch,
        }}
      />
    );
  }
}
