import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TextInput, Keyboard, Alert} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {connect} from 'react-redux';
import {addFriend} from '../actions/friendListActions';
const AddFriend = props => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLasName] = useState('');
  const [age, setAge] = useState('');

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
    Keyboard.dismiss;
    const friend = {
      Id: new Date().getTime(),
      First_Name__c: firstName,
      Last_Name__c: lastName,
      Age__c: age,
      isAdded: true,
    };
    // If User is connected to internet, we can post value here otherwise save in redux to Sync later when internet restores
    // Add Friend APi is Failing Right now with below error
    //"System.DmlException: Insert failed. First exception on row 0; first error: STORAGE_LIMIT_EXCEEDED, storage limit exceeded: []\n\nClass.APIService.doPost: line 18, column 1"
    props.addFriend(friend);
    Alert.alert('Alert', 'Friend Added Successfully', [
      {
        text: 'Ok',
        onPress: () => props.navigation.pop(),
      },
    ]);
  };
  return (
    <View style={styles.container}>
      <Text>Enter Your Friend Details</Text>
      <TextInput
        style={styles.input}
        onChange={e => setFirstName(e.nativeEvent.text)}
        value={firstName}
        placeholder="First Name"
        maxLength={30}
      />
      <TextInput
        style={styles.input}
        onChange={e => setLasName(e.nativeEvent.text)}
        value={lastName}
        placeholder="Last Name"
        maxLength={30}
      />
      <TextInput
        style={styles.input}
        onChange={e => setAge(e.nativeEvent.text)}
        value={age}
        placeholder="Age"
        keyboardType="numeric"
        maxLength={2}
      />

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

const mapDispatchToProps = {
  addFriend: addFriend,
};
export default connect(null, mapDispatchToProps)(AddFriend);
