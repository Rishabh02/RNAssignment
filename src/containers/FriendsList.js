import React, {useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ActivityIndicator,
} from 'react-native';
import {screens} from '../constants';
import {getFriendList} from '../actions/friendListActions';
import {connect} from 'react-redux';
import {FlatList} from 'react-native-gesture-handler';
const FriendsListScreen = props => {
  const {data} = props;
  useEffect(() => {
    if (data.length === 0)
        props.getFriendList();
  }, []);
  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          console.log({item});
          props.navigation.navigate(screens.FRIEND_DETAILS_SCREEN, {
            data: item,
            index: index,
          });
        }}>
        <Text>
          Name: {item.First_Name__c} {item.Last_Name__c}
        </Text>
        <Text>Age: {item.Age__c}</Text>
      </TouchableOpacity>
    );
  };
  const itemSeparatorComponent = () => {
    return <View style={styles.itemSeparator}></View>;
  };
  return (
    <View style={{flex: 1}}>
      <Text>Friends List </Text>
      {props.isFetching ? (
        <ActivityIndicator color={'blue'} size="large" />
      ) : (
        <FlatList
          extraData={data}
          data={data}
          renderItem={renderItem}
          keyExtractor={item => item.Id}
          ItemSeparatorComponent={itemSeparatorComponent}
        />
      )}

      <TouchableOpacity
        onPress={() => props.navigation.navigate(screens.ADD_FRIEND_SCREEN)}>
        <Image
          style={styles.plusButton}
          source={require('../assets/add-icon.png')}
        />
      </TouchableOpacity>
    </View>
  );
};
const mapStateToProps = state => ({
  data: state.counter.friendsList,
  isFetching: state.counter.isFetching,
});
const mapDispatchToProps = {
  getFriendList: getFriendList,
};
const styles = StyleSheet.create({
  itemSeparator: {height: 1, backgroundColor: '#000'},
  plusButton: {
    tintColor: 'blue',
    width: 40,
    height: 40,
    position: 'absolute',
    bottom: 50,
    right: 10,
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(FriendsListScreen);
