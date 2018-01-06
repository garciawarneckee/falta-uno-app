import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { Text, SocialIcon } from 'react-native-elements';
import { Facebook } from 'expo';
import * as Firebase from 'firebase';

import Colors from 'constants/Colors';
import Config from 'config'

export default class LoginScreen extends React.Component {
  state = {
    isLogging: false,
    toast: false,
    toastState: null,
    toastMsg: null,
  }

  render() {

    let toast;
    if (this.state.toast) {
      toast = <View style={{ backgroundColor: Colors[this.state.toastState] }}>
        <Text style={(styles.toast)}>{this.state.toastMsg}</Text>
      </View>
    }

    const buttonProps = {
      title: "Ingresar con Facebook",
      disabled: this.state.isLogging
    }

    if(this.state.isLogging){
      buttonProps.title = "Ingresando...";
    }

    return (
      <View style={styles.flexible}>
        <View style={[styles.end, styles.imageContainer]}>
          <Image source={require('assets/images/icon.png')}></Image>
          <Text h1 style={styles.title}>Falta Uno!</Text>
          <Text h4>La app que no te deja tirado</Text>
        </View>
        <View style={[styles.flexible, styles.end]}>
          <SocialIcon button type="facebook" onPress={this.login} {...buttonProps} />
        </View>
        <View style={[styles.flexible, styles.end]}>
          {toast}
        </View>
      </View>
    );
  }

  login = async () => {
    this.setState({ isLogging: true });
    const { type, token } = await Facebook.logInWithReadPermissionsAsync(Config.facebook.appId);
    if (type === 'success') {

      this.setState({
        toast: true,
        toastState: 'primary',
        toastMsg: "¡Proceso completado con éxito!"
      });

      // Build Firebase credential with the Facebook access token.
      const credential = Firebase.auth.FacebookAuthProvider.credential(token);
      // Sign in with credential from the Facebook user.
      Firebase.auth().signInWithCredential(credential).catch(() => {
        this.setState({
          isLogging: false,
          toast: true,
          toastState: 'danger',
          toastMsg: "Ocurrió un error al guardar la autorización.\nIntentá nuevamente más tarde"
        });
      });
    } else if (type === 'cancel') {
      this.setState({
        isLogging: false,
        toast: true,
        toastState: 'danger',
        toastMsg: "Cancelaste el proceso.\nPara ingresar tenés que autorizar la aplicación."
      });
    }
  }
}

const styles = StyleSheet.create({
  flexible: {
    flex: 1
  },
  title:{
    marginTop: 20
  },
  imageContainer: {
    flex: 4, 
    alignItems: 'center', 
  },
  end:{
    justifyContent: 'flex-end'
  },
  toast: {
    color: Colors.light,
    margin: 10,
    textAlign: 'center'
  }
});
