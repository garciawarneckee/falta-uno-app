import React from 'react';

import Lang from 'lang'
import { View, StyleSheet, AsyncStorage, Alert } from 'react-native';
import { List, ListItem, Slider } from 'react-native-elements';
import Colors from 'constants/Colors';
import * as Firebase from 'firebase';


export default class AvailabilityScreen extends React.Component {
  static navigationOptions = () => ({
    title: Lang.t('availability.title'),
  });

  state = {
    available: true,
    filterByDistance: true,
    distance: 15,
  }

  constructor(props) {
    super(props);
    this.uid = Firebase.auth().currentUser.uid;;
    this.db = Firebase.database()
  }

  componentWillMount() {
    let that = this
    this.db.ref(`users/${this.uid}`).on('value', (snapshot) => {
      const userState = snapshot.val();
      if (userState) {
        that.setState(userState);
      }
    })
  }

  _updateUser(data){
    this.db.ref(`users/${this.uid}`).set(data)
  }

  render() {
    return <View>
      <List>
        <ListItem
          title={Lang.t('availability.available')}
          hideChevron
          switchButton
          switched={this.state.available}
          onSwitch={() => this._updateUser({ available: !this.state.available })}
        />
        <ListItem
          title={Lang.t('availability.filterByDistance')}
          hideChevron
          switchButton
          switched={this.state.filterByDistance}
          onSwitch={() => this._updateUser({ filterByDistance: !this.state.filterByDistance })}
        />
        <ListItem
          disabled={!this.state.filterByDistance}
          hideChevron
          subtitle={Lang.t('availability.distance', { distance: this.state.distance })}
          subtitleStyle={style.sliderLabel}
          title={<Slider
            disabled={!this.state.filterByDistance}
            minimumTrackTintColor={Colors.primaryLight}
            minimumValue={1}
            maximumValue={30}
            onValueChange={(distance) => this._updateUser({ distance })}
            step={1}
            thumbTintColor={Colors.primary}
            value={this.state.distance}
          />}
        />
      </List>
    </View>
  }
}

const style = StyleSheet.create({
  sliderLabel: {
    color: Colors.muted,
    fontSize: 14,
    alignSelf: 'center'
  }
})
