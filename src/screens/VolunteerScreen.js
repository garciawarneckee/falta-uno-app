import React from 'react';

import Lang from 'lang'
import { View, Platform, StyleSheet } from 'react-native';
import { List, ListItem, CheckBox, Divider, Slider, Text } from 'react-native-elements';
import Colors from 'constants/Colors';



export default class VolunteerScreen extends React.Component {
  static navigationOptions = () => ({
    title: Lang.t('volunteer.title'),
  });

  state = {
    available: true,
    filterByDistance: true,
    distance: 15,
  }

  render() {
    return <View>
      <List>
        <ListItem
          title={Lang.t('volunteer.available')}
          hideChevron
          switchButton
          switched={this.state.available}
          onSwitch={() => this.setState({ available: !this.state.available })}
        />
        <ListItem
          title={Lang.t('volunteer.filterByDistance')}
          hideChevron
          switchButton
          switched={this.state.filterByDistance}
          onSwitch={() => this.setState({ filterByDistance: !this.state.filterByDistance })}
        />
        <ListItem
          disabled={!this.state.filterByDistance}
          hideChevron
          subtitle={Lang.t('volunteer.distance', { distance: this.state.distance })}
          subtitleStyle={style.sliderLabel}
          title={<Slider
            disabled={!this.state.filterByDistance}
            minimumTrackTintColor={Colors.primaryLight}
            minimumValue={1}
            maximumValue={30}
            onValueChange={(distance) => this.setState({ distance })}
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
