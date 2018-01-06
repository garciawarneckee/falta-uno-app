import React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { AppLoading, Asset, Font } from 'expo';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import * as Firebase from 'firebase';

import Config from 'config'

import RootNavigation from 'navigation/RootNavigation';
import LoginScreen from 'screens/LoginScreen';

export default class App extends React.Component {
  state = {
    isLoadingComplete: false,
    loggedIn: false
  };

  componentWillMount(){
    // Inicializo Firebase
    Firebase.initializeApp(Config.firebase);
  }

  render() {
    // Cargando
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } 
    return (
      <View style={styles.container}>
        {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
        {Platform.OS === 'android' && <View style={styles.statusBarUnderlay} />}
        {this.state.loggedIn ?  <RootNavigation /> : <LoginScreen />}
      </View>
    );
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        require('assets/images/robot-dev.png'),
        require('assets/images/robot-prod.png'),
      ]),
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        ...Ionicons.font,
        ...FontAwesome.font,
        // @shoutem/ui fonts
        'Rubik-Regular': require('assets/fonts/Rubik-Regular.ttf'),
        'rubicon-icon-font': require('assets/fonts/rubicon-icon-font.ttf'),
      }),
    ]);
  };

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    // Listen for authentication state to change.
    Firebase.auth().onAuthStateChanged((user) => {
      // Do other things
      this.setState({ 
        isLoadingComplete: true,
        loggedIn: user != null
      });
    });
    
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  statusBarUnderlay: {
    height: 24,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
});
