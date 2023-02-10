import React, {useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {registerFulfilled} from '../actions/friendListActions';
import NetInfo from '@react-native-community/netinfo';
function HomeScreen(props) {
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      console.log('Connection type', state.type);
      console.log('Is connected?', state.isConnected);
      if (state.isConnected) {
        //Updated Friends List
        const updatedList = props.data.filter(item => item.isUpdated);
        const addedList = props.data.filter(item => item.isAdded);
        if (updatedList.length > 0 || addedList.length > 0) {
          //Use Post API to post updated record
          alert('Updating your records');
        }
      }
    });
    return () => unsubscribe();
  }, []);
  return (
    <View style={styles.continer}>
      <Text>Home Screen</Text>
    </View>
  );
}
const mapStateToProps = state => ({
  data: state.counter.friendsList,
});
const mapDispatchToProps = {
  registerFulfilled: registerFulfilled,
};
const styles = StyleSheet.create({
  continer: {flex: 1, alignItems: 'center', justifyContent: 'center'},
});
export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
