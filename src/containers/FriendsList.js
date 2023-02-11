import React, {useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ActivityIndicator,
} from 'react-native';
import {colors, screens} from '../constants';
import {getFriendList} from '../actions/friendListActions';
import {connect} from 'react-redux';
import {FlatList} from 'react-native-gesture-handler';
const FriendsListScreen = props => {
  const {data} = props;
  useEffect(() => {
    if (data.length === 0) props.getFriendList();
  }, []);
  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          console.log({item});
          props.navigation.navigate(screens.FRIEND_DETAILS_SCREEN, {
            Id: item.Id,
          });
        }}>
        <View style={styles.mainCardView}>
          <Text style={styles.text}>
            Name: {item.First_Name__c} {item.Last_Name__c}
          </Text>
          <Text style={styles.text}>Age: {item.Age__c}</Text>
        </View>
      </TouchableOpacity>
    );
  };
  const listHeaderComponent = () => {
    return (
      <Text
        style={{
          ...styles.text,
          marginLeft: 10,
          fontWeight: 'bold',
          fontSize: 20,
        }}>
        Friends List{' '}
      </Text>
    );
  };
  return (
    <View style={{flex: 1, }}>
      {props.isFetching ? (
        <ActivityIndicator style={{alignSelf: 'center', flex: 1}} color={colors.theme_color} size="large" />
      ) : (
        <FlatList
          extraData={data}
          data={data}
          renderItem={renderItem}
          keyExtractor={item => item.Id}
          ListHeaderComponent={listHeaderComponent}
        />
      )}

      <TouchableOpacity
        style={styles.plusButton}
        onPress={() => props.navigation.navigate(screens.ADD_FRIEND_SCREEN)}>
        <Image
          style={{tintColor: colors.theme_color}}
          source={require('../assets/add-icon.png')}
        />
      </TouchableOpacity>
    </View>
  );
};
const mapStateToProps = state => ({
  data: state.friendsListReducer.friendsList,
  isFetching: state.friendsListReducer.isFetching,
});
const mapDispatchToProps = {
  getFriendList: getFriendList,
};
const styles = StyleSheet.create({
  itemSeparator: {height: 1, backgroundColor: 'grey'},
  plusButton: {
    width: 40,
    height: 40,
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
  mainCardView: {
    height: 90,
    backgroundColor: 'White',
    borderRadius: 4,
    shadowColor: 'Grey',
    shadowOffset: {height: 4, width: 0},
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 6,
    marginVertical: 5,
    marginHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {fontSize: 17, color: 'black'},
});
export default connect(mapStateToProps, mapDispatchToProps)(FriendsListScreen);
