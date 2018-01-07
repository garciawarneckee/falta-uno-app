import React from 'react';
import { Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TabNavigator, TabBarBottom } from 'react-navigation';

import Colors from 'constants/Colors';

import SearchScreen from 'screens/SearchScreen';
import MyMatchesScreen from 'screens/MyMatchesScreen';
import VolunteerScreen from 'screens/VolunteerScreen';

export default TabNavigator(
  {
    Search: {
      screen: SearchScreen,
    },
    MyMatches: {
      screen: MyMatchesScreen,
    },
    Volunteer: {
      screen: VolunteerScreen,
    },
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused }) => {
        const { routeName } = navigation.state;
        let iconName;
        switch (routeName) {
          case 'Search':
            iconName =
              Platform.OS === 'ios'
                ? `ios-search${focused ? '' : '-outline'}`
                : 'md-search';
            break;
          case 'MyMatches':
            iconName = Platform.OS === 'ios' ? `ios-football${focused ? '' : '-outline'}` : 'md-football';
            break;
          case 'Volunteer':
            iconName =
              Platform.OS === 'ios' ? `ios-hand${focused ? '' : '-outline'}` : 'md-hand';
        }
        return (
          <Ionicons
            name={iconName}
            size={28}
            style={{ marginBottom: -3 }}
            color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
          />
        );
      },
    }),
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    animationEnabled: false,
    swipeEnabled: false,
  }
);
