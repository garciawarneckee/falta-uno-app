import React from 'react';
import { Button, Image, Screen, Text, View, Spinner, Row } from '@shoutem/ui';

import { Facebook } from 'expo';
import { FontAwesome } from '@expo/vector-icons';

import * as Firebase from 'firebase';
import Color from 'constants/Colors';
import Config from 'config'
import { StyleSheet } from 'react-native';

export default class LoginScreen extends React.Component {
  state = {
    isLogging: false,
    toast: false,
    toastState: null,
    toastMsg: null,
  }

  render() {

    let errorMessage;
    if (this.state.toast) {
      errorMessage = <View styleName="flexible vertical v-end">
        <View styleName="sm-gutter" style={{backgroundColor:Color[this.state.toastState]}}>
          <Text style={css(styles.toast)}>{this.state.toastMsg}</Text>
        </View>
      </View>
    } else {
      errorMessage = <View styleName="flexible vertical v-end"></View>
    }

    return (
      <Screen>
        <View styleName="flexible vertical v-end h-center" style={{ flex: 2 }}>
          <Image styleName="medium-square" source={require('assets/images/icon.png')}></Image>
        </View>
        <View styleName="flexible vertical v-end">
          <Button style={css(styles.buttonBg)} styleName="md-gutter" onPress={this.login}>
            {this.state.isLogging ? <Text></Text> : <FontAwesome name="facebook" style={styles.buttonText}></FontAwesome>}
            {this.state.isLogging ? <Spinner style={{ color: Color.white }} /> : <Text style={css(styles.buttonText)} styleName="sm-gutter-left">Ingresar con Facebook</Text>}
          </Button>
        </View>
        {errorMessage}
      </Screen>
    );
  }

  login = async () => {
    this.setState({ isLogging: true });
    const { type, token } = await Facebook.logInWithReadPermissionsAsync(Config.facebook.appId);
    if (type === 'success') {
      
      this.setState({ 
        toast: true, 
        toastState: 'success',
        toastMsg: "Ingresando..."
      });

      // Build Firebase credential with the Facebook access token.
      const credential = Firebase.auth.FacebookAuthProvider.credential(token);
      // Sign in with credential from the Facebook user.
      Firebase.auth().signInWithCredential(credential).catch((error) => {
        this.setState({ 
          isLogging: false, 
          toast: true, 
          toastState: 'danger',
          toastMsg: "Ocurrió un error al guardar la autorización.\nIntentá nuevamente más tarde"
        });
      });
    } else if(type === 'cancel'){
      this.setState({ 
        isLogging: false, 
        toast: true, 
        toastState: 'danger',
        toastMsg: "Cancelaste el proceso.\nPara ingresar tenés que autorizar la aplicación."
      });
    }
  }
}

const css = StyleSheet.flatten;
const styles = StyleSheet.create({
  buttonBg: {
    backgroundColor: Color.facebook,
  },
  buttonText: {
    color: Color.white,
    fontSize: 16,
  },
  toast:{
    color: Color.white, 
    textAlign: 'center'
  }
});
