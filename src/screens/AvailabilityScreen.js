import React from 'react';

import Lang from 'lang'
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { List, ListItem, Slider } from 'react-native-elements';
import Colors from 'constants/Colors';
import * as Firebase from 'firebase';


export default class AvailabilityScreen extends React.Component {
  static navigationOptions = () => ({
    title: Lang.t('availability.title'),
  });

  state = {
    loading: true,
    user: {
      available: true,
      filterByDistance: true,
      distance: 15,
    }
  }

  constructor(props) {
    super(props);
    const uid = Firebase.auth().currentUser.uid;
    this.userRef = Firebase.database().ref(`users/${uid}`)
  }

  componentDidMount() {
    this.userRef.on('value', (snapshot) => {
      const userState = snapshot.val();
      if (userState) {
        const newUserState = Object.assign({}, this.state.user, userState)
        this.setState({ loading: false, user: newUserState })
      }
    })
  }

  _updateUser(userState) {
    const newUserState = Object.assign({}, this.state.user, userState)
    this.userRef.set(newUserState)
  }

  render() {
    if (this.state.loading) {
      return <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    }

    return <View>
      <List>
        <ListItem
          title={Lang.t('availability.available')}
          hideChevron
          switchButton
          switched={this.state.user.available}
          onSwitch={() => this._updateUser({ available: !this.state.user.available })}
        />
        <ListItem
          title={Lang.t('availability.filterByDistance')}
          hideChevron
          switchButton
          switched={this.state.user.filterByDistance}
          onSwitch={() => this._updateUser({ filterByDistance: !this.state.user.filterByDistance })}
        />
        <ListItem
          disabled={!this.state.user.filterByDistance}
          hideChevron
          subtitle={Lang.t('availability.distance', { distance: this.state.user.distance })}
          subtitleStyle={styles.sliderLabel}
          title={<Slider
            disabled={!this.state.user.filterByDistance}
            minimumTrackTintColor={Colors.primaryLight}
            minimumValue={1}
            maximumValue={30}
            onValueChange={(distance) => this._updateUser({ distance })}
            step={1}
            thumbTintColor={Colors.primary}
            value={this.state.user.distance}
          />}
        />
      </List>
    </View>
  }
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  sliderLabel: {
    color: Colors.muted,
    fontSize: 14,
    alignSelf: 'center'
  }
})
