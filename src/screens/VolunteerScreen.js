import React from 'react';

import Lang from 'lang'
import { Text, View } from 'react-native';

export default class VolunteerScreen extends React.Component {
  static navigationOptions = () => ({
    title: Lang.t('volunteer.title'),
  });

  render() {
    /* Go ahead and delete ExpoConfigView and replace it with your
     * content, we just wanted to give you a quick view of your config */
    return <View>
      <Text>{Lang.t('volunteer.title')}</Text>
    </View>;
  }
}
