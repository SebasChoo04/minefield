import React, { useState, useEffect } from 'react';
import { Text, View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { styles as defaultStyles } from '../functions/Styles';  
import firebase from '../functions/FirebaseConfig';

export default function AddNewScoreScreen({ navigation, route }) {

  const bestTime = route.params.time;
  const [bestName, setBestName] = useState('');
  const [bestUnit, setBestUnit] = useState('');

  async function uploadToFirestore() {
    const data = {
      name: bestName,
      unit: bestUnit,
      time: bestTime
    }
    const res = await firebase.firestore().collection('leaderboard').doc('latest').set(data);

    navigation.navigate('Home')
  }

  return (
    <View style={styles.container}>

      <Text style={defaultStyles.title}> Congratulations! </Text>

      <Text style={{marginTop: 10}}> You have beaten the previous time, please enter your name and unit. </Text>

      <Text style={[defaultStyles.buttonText, {marginTop: 20}]}> Name </Text>

      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
        onChangeText={text => setBestName(text)}
        value={bestName}/>

      <Text style={[defaultStyles.buttonText, {marginTop: 10}]}> Unit</Text>

      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
        onChangeText={text => setBestUnit(text)}
        value={bestUnit}/>

      <TouchableOpacity onPress={uploadToFirestore} style={[defaultStyles.button, {marginTop: 20}]}>
        <Text style={defaultStyles.controlButtonText}> Submit </Text>
      </TouchableOpacity>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 20,
  }
})