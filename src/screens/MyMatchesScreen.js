import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { ExpoLinksView } from '@expo/samples';

import Lang from 'lang'


export default class MyMatchesScreen extends React.Component {
  static navigationOptions = () => ({
    title: Lang.t('myMatches.title'),
  });

  render() {
    return (
      <ScrollView style={styles.container}>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
  },
});
