import React, { Component } from 'react';
import { bool } from 'prop-types';
import { Platform, StatusBar, StyleSheet, View, Text } from 'react-native';
import { Asset, Font } from 'expo';
import { EvilIcons } from '@expo/vector-icons';
import RootNavigation from './navigation/RootNavigation';

import { Provider, connect } from 'react-firebase'
import firebase, { initializeApp } from 'firebase';

const firebaseApp = null;
if (!firebase.apps.length) {
  firebaseApp = initializeApp({
    apiKey: "AIzaSyDdTmZPfamocJYLs3ce7tnHA_12niJBfCk",
    authDomain: "terracetemp2.firebaseapp.com",
    databaseURL: "https://terracetemp2.firebaseio.com",
    projectId: "terracetemp2",
    storageBucket: "terracetemp2.appspot.com",
    messagingSenderId: "607134304579"
  })
}


class App extends Component {
  static propTypes = {
    skipLoadingScreen: bool,
  }

  constructor(props) {
    super(props);
    this.state = {
      assetsAreLoaded: false,
    };
  }

  componentWillMount() {
    this.loadAssetsAsync();
  }

  async loadAssetsAsync() {
    try {
      await Promise.all([
        Asset.loadAsync([
          require('./assets/images/robot-dev.png'),
          require('./assets/images/robot-prod.png'),
        ]),
        Font.loadAsync([
          EvilIcons.font,
          { 'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf') },
        ]),
      ]);
    } catch (e) {
      console.warn(
        'There was an error caching assets (see: App.js), perhaps due to a ' +
        'network timeout, so we skipped caching. Reload the app to try again.',
      );
      console.log(e);
    } finally {
      this.setState({ assetsAreLoaded: true });
    }
  }

  render() {
    if (!this.state.assetsAreLoaded && !this.props.skipLoadingScreen) {
      return <View><Text>Loading...</Text></View>;
    }
    return (
      <Provider firebaseApp={firebaseApp}>
        <View style={s.container}>
          {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
          {Platform.OS === 'android' &&
            <View style={s.statusBarUnderlay} />}
          <RootNavigation />
        </View>
      </Provider>
    );
  }
}

const mapFirebaseToProps = (props, ref) => ({
  values: 'dataset2'
})

export default connect(mapFirebaseToProps)(App)


const s = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  statusBarUnderlay: {
    height: 24,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
});
