import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TextInput, Keyboard, Alert} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {connect} from 'react-redux';
import {registerFulfilled} from '../actions/friendListActions';
const FriendDetailsScreen = props => {
  const {route} = props;
  const data = route.params.data;
  const index = route.params.index;
  const [firstName, setFirstName] = useState(data.First_Name__c);
  const [lastName, setLasName] = useState(data.Last_Name__c);
  const [age, setAge] = useState(data.Age__c + '');
  const [editable, setEditable] = useState(false);

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
      firstName == data.First_Name__c &&
      lastName == data.Last_Name__c &&
      age == data.Age__c
    ) {
      alert('Edit values before saving');
    } else {
      Keyboard.dismiss();
      const updateFriend = {...data};
      updateFriend.First_Name__c = firstName;
      updateFriend.Last_Name__c = lastName;
      updateFriend.Age__c = age;
      updateFriend.isUpdated = true;
      const updatedList = [...props.data];
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
      <Text>ID: {data.Id}</Text>
      <TextInput
        style={styles.input}
        onChange={e => setFirstName(e.nativeEvent.text)}
        value={firstName}
        placeholder="First Name"
        maxLength={30}
        editable={editable}
      />
      <TextInput
        style={styles.input}
        onChange={e => setLasName(e.nativeEvent.text)}
        editable={editable}
        value={lastName}
        placeholder="Last Name"
        maxLength={30}
      />
      <TextInput
        style={styles.input}
        onChange={e => setAge(e.nativeEvent.text)}
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
  data: state.counter.friendsList,
});
const mapDispatchToProps = {
  registerFulfilled: registerFulfilled,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FriendDetailsScreen);
