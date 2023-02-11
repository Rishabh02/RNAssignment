import React from 'react';
import {screens} from '../constants';
import {createStackNavigator} from '@react-navigation/stack';
import FriendsListScreen from '../containers/FriendsList';
import FriendDetailsScreen from '../containers/FriendDetail';
import AddFriend from '../containers/AddFriend';

const Stack = createStackNavigator();

export default () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name={screens.FRIENDS_LIST} component={FriendsListScreen} />
      <Stack.Screen
        name={screens.FRIEND_DETAILS_SCREEN}
        component={FriendDetailsScreen}
        options={{headerShown: true, title: 'Friend Details'}}
      />
      <Stack.Screen
        name={screens.ADD_FRIEND_SCREEN}
        component={AddFriend}
        options={{headerShown: true, title: 'Add Friend'}}
      />
    </Stack.Navigator>
  );
};
