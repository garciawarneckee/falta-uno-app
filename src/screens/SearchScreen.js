import React from 'react';
import { ScrollView, Text, View, StyleSheet } from 'react-native';
import Lang from 'lang';
import { SearchBar, Header } from 'react-native-elements';
import Colors from 'constants/Colors';

export default class SearchScreen extends React.Component {
  // Definimos de forma dinamica (funcion) para que el lenguaje este bien calculado (sino recae en ingles)
  static navigationOptions = () => ({
    title: Lang.t('search.title'),
  });

  state = {
    search: ""
  }

  render() {
    return (
      <View style={styles.container}>
        <SearchBar 
          clearIcon={this.state.search ? { name: 'clear', type: 'ionicons' } : false}
          containerStyle={{ width: '100%', backgroundColor: Colors.light }} 
          inputStyle={{backgroundColor: Colors.tabBar}}
          lightTheme
          onChangeText={(search) => {this.setState({ search })}}
          placeholder={Lang.t('search.placeholder')}/>
        <ScrollView>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20
  }
})
