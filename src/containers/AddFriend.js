import React, {useEffect, useState, useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Keyboard,
  Alert,
  Image,
} from 'react-native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {connect} from 'react-redux';
import {addFriend} from '../actions/friendListActions';
import * as ImagePicker from 'react-native-image-picker';
import {colors} from '../constants';
const AddFriend = props => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLasName] = useState('');
  const [age, setAge] = useState('');
  const [response, setResponse] = React.useState(null);

  const onButtonPress = useCallback((type, options) => {
    //if (type === 'capture') {

    ImagePicker.launchCamera().then(response => setResponse(response));
    //}
  }, []);
  console.log(JSON.stringify(response));
  if (response) {
    console.log(response.assets[0].uri);
  }
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
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.header}>Enter Your Friend's Details</Text>
        <TouchableOpacity style={styles.imageContainer} onPress={onButtonPress}>
          <Image
            resizeMode="cover"
            resizeMethod="scale"
            style={{height: 100, width: 100, borderRadius: 50}}
            source={
              response
                ? {uri: response.assets[0].uri}
                : require('../assets/user.png')
            }
          />
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          onChangeText={setFirstName}
          value={firstName}
          placeholder="First Name"
          maxLength={30}
          returnKeyType='next'
        />
        <TextInput
          style={styles.input}
          onChangeText={setLasName}
          value={lastName}
          placeholder="Last Name"
          maxLength={30}
          returnKeyType='next'
        />
        <TextInput
          style={styles.input}
          onChangeText={setAge}
          value={age}
          placeholder="Age"
          keyboardType="numeric"
          maxLength={2}
          returnKeyType='done'
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
    </ScrollView>
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
  imageContainer: {
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    height: 100,
    width: 100,
    borderRadius: 50,
    borderColor: colors.theme_color,
    backgroundColor: 'grey',
    margin: 5,
  },
  header: {
    marginTop: 5,
    marginBottom: 20,
    marginLeft: 10,
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
});

const mapDispatchToProps = {
  addFriend: addFriend,
};
export default connect(null, mapDispatchToProps)(AddFriend);
