import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
function Settingscreen() {
  return (
    <View style={styles.continer}>
      <Text>Settings Screen</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  continer: {flex: 1, alignItems: 'center', justifyContent: 'center'},
});
export default Settingscreen;
