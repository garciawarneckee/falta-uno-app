import React from 'react';
import { Image, Platform, StatusBar, StyleSheet, View } from 'react-native';
import { AppLoading, Asset, Font } from 'expo';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import * as Firebase from 'firebase';

import Config from 'config'
import I18n from 'lang/main'

import RootNavigation from 'navigation/RootNavigation';
import LoginScreen from 'screens/LoginScreen';

function cacheImages(images) {
  return images.map(image => {
    if (typeof image === 'string') {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
}

function cacheFonts(fonts) {
  return fonts.map(font => Font.loadAsync(font));
}

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
    // Fonts
    const fontAssets = cacheFonts([
      { ...Ionicons.font },
      { ...FontAwesome.font },
    ]);

    // Images cache
    const imageAssets = cacheImages([
      require('assets/images/robot-dev.png'),
      require('assets/images/robot-prod.png'),
      require('assets/images/icon.png'),
    ]);

    // I18n
    const langAssets = I18n.initAsync()

    return Promise.all([
      ...fontAssets,
      ...imageAssets,
      ...langAssets,
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
