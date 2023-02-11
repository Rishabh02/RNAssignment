import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {screens} from '../constants';
import HomeScreen from '../containers/Home';
import Settingscreen from '../containers/Settings';
import FriendsStack from './FriendsStack';
const Tab = createBottomTabNavigator();
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';

function MyTabBar({state, descriptors, navigation}) {
  return (
    <View style={styles.tabBarContainer}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            // The `merge: true` option makes sure that the params inside the tab screen are preserved
            navigation.navigate({name: route.name, merge: true});
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Image
              style={[
                {...styles.tabIcon},
                {tintColor: isFocused ? '#673ab7' : '#222'},
              ]}
              source={
                label == 'Home'
                  ? require('../assets/home-icon.png')
                  : label == 'Friends'
                  ? require('../assets/friends-icon.png')
                  : require('../assets/settings-icon.png')
              }></Image>
            <Text style={{color: isFocused ? '#673ab7' : '#222'}}>{label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

function App() {
 
  return (
    <NavigationContainer
      fallback={<ActivityIndicator color="blue" size="large" />}>
      <Tab.Navigator
        tabBar={props => <MyTabBar {...props} />}
        initialRouteName={screens.HOME_SCREEN}
        screenOptions={{
          headerShown: false,
          lazy: false,
        }}>
        <Tab.Screen
          name={screens.HOME_SCREEN}
          component={HomeScreen}
          options={{headerShown: false, tabBarLabel: 'Home'}}
        />
        <Tab.Screen
          name={screens.FRIENDS_SCREEN}
          component={FriendsStack}
          options={{headerShown: false, tabBarLabel: 'Friends'}}
        />
        <Tab.Screen
          name={screens.SETTINGS_SCREEN}
          component={Settingscreen}
          options={{headerShown: false, tabBarLabel: 'Settings'}}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
const styles = StyleSheet.create({
  tabBarContainer: {flexDirection: 'row', height: 45},
  tabIcon: {
    height: 24,
    width: 24,
  },
});
export default App;
