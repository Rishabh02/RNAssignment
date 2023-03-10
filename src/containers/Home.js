import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Linking} from 'react-native';
import {connect} from 'react-redux';
import {registerFulfilled} from '../actions/friendListActions';
import NetInfo from '@react-native-community/netinfo';
import {screens} from '../constants';
let isDataSynced  = false;
function HomeScreen(props) {
  //const [isDataSynced, setSynced] = useState(false);

  useEffect(() => {
    const handleOpenURL = url => {
      const it = url.url.split('/');
      const isForDetails = it.filter(item => item == 'friendId')[0];
      if (isForDetails) {
        const Id = it[it.length - 1];
        props.navigation.navigate(screens.FRIEND_DETAILS_SCREEN, {
          Id: Id,
        });
      }
    };
    Linking.addEventListener('url', handleOpenURL);
    Linking.getInitialURL().then(url => {
      if (url) {
        handleOpenURL({url});
      }
    });
    const unsubscribe = NetInfo.addEventListener(state => {
      console.log('Connection type', state.type);
      console.log('Is connected?', state.isConnected);
      if (state.isConnected) {
        //Updated Friends List
        const updatedList = props.data.filter(item => item.isUpdated);
        const addedList = props.data.filter(item => item.isAdded);
        if ((updatedList.length > 0 || addedList.length > 0) && !isDataSynced) {
          //Use Post API to post updated record
          isDataSynced = true;
          alert('Updating your records.');
        }
      }
    });
    return () => {
      if (handleOpenURL) Linking.removeEventListener('url', handleOpenURL);
      unsubscribe();
    };
  }, []);
  return (
    <View style={styles.continer}>
      <Text>Home Screen</Text>
    </View>
  );
}
const mapStateToProps = state => ({
  data: state.friendsListReducer.friendsList,
});
const mapDispatchToProps = {
  registerFulfilled: registerFulfilled,
};
const styles = StyleSheet.create({
  continer: {flex: 1, alignItems: 'center', justifyContent: 'center'},
});
export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
