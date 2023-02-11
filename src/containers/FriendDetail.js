import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TextInput, Keyboard, Alert} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {connect} from 'react-redux';
import {registerFulfilled} from '../actions/friendListActions';
const FriendDetailsScreen = props => {
  const {route} = props;
  const [firstName, setFirstName] = useState('');
  const [lastName, setLasName] = useState('');
  const [age, setAge] = useState('');
  const [editable, setEditable] = useState(false);
  const [friendDetails, setFriendDetails] = useState({});
  const [index, setIndex] = useState({});
  useEffect(() => {
    const data = route.params && route.params.data ? route.params.data : null;
    const index = route.params && route.params.index ? route.params.index : 0;
    setFirstName(data.First_Name__c);
    setLasName(data.Last_Name__c);
    setAge(data.Age__c + '');
    setFriendDetails(data);
    setIndex(index);
  }, []);
  const saveData = () => {
    if (firstName.length === 0) {
      alert('Please enter first name');
      return;
    }
    if (lastName.length === 0) {
      alert('Please enter last name');
      return;
    }
    if (age.length === 0) {
      alert('Please enter age');
      return;
    }
    if (
      firstName == friendDetails.First_Name__c &&
      lastName == friendDetails.Last_Name__c &&
      age == friendDetails.Age__c
    ) {
      alert('Edit values before saving');
    } else {
      Keyboard.dismiss();
      const updateFriend = {...friendDetails};
      updateFriend.First_Name__c = firstName;
      updateFriend.Last_Name__c = lastName;
      updateFriend.Age__c = age;
      updateFriend.isUpdated = true;
      const updatedList = [...props.friendsList];
      updatedList[index] = updateFriend;
      // If User is connected to internet, we can post value here
      //otherwise save in redux to Sync later when internet restores
      props.registerFulfilled(updatedList);

      Alert.alert('Alert', 'Updated Successfully', [
        {
          text: 'Ok',
          onPress: () => props.navigation.pop(),
        },
      ]);
    }
  };
  return (
    <View style={styles.container}>
      <Text>ID: {friendDetails.Id}</Text>
      <TextInput
        style={styles.input}
        onChangeText={setFirstName}
        value={firstName}
        placeholder="First Name"
        maxLength={30}
        editable={editable}
      />
      <TextInput
        style={styles.input}
        onChangeText={setLasName}
        editable={editable}
        value={lastName}
        placeholder="Last Name"
        maxLength={30}
      />
      <TextInput
        style={styles.input}
        onChangeText={setAge}
        editable={editable}
        value={age}
        placeholder="Age"
        keyboardType="numeric"
        maxLength={2}
      />
      {!editable ? (
        <TouchableOpacity
          onPress={() => setEditable(true)}
          style={{
            ...styles.input,
            backgroundColor: 'blue',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{color: 'white'}}>Edit</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={() => saveData()}
          style={{
            ...styles.input,
            backgroundColor: 'blue',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{color: 'white'}}>Save</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {flex: 1, margin: 10},
  input: {
    height: 40,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: 'black',
    paddingLeft: 10,
    margin: 10,
  },
});
const mapStateToProps = state => ({
  friendsList: state.friendsListReducer.friendsList,
});
const mapDispatchToProps = {
  registerFulfilled: registerFulfilled,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FriendDetailsScreen);
