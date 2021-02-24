import React from 'react';
import { Text, View, StyleSheet, FlatList } from 'react-native';

export default function FieldGrid({ currentPosition }) {

  const index = [[1, 2, 3, 4, 5], [6, 7, 8, 9, 10], [11, 12, 13, 14, 15], [16, 17, 18, 19, 20], [21, 22, 23, 24, 25]]

  function Box({ position }) {
    return (
      <View style={[styles.box, {backgroundColor: position === 1 ? "yellow" : "white"}]}>
        <Text style={{ fontSize: 40 }}> {position === currentPosition ? 'X' : ''} </Text>
      </View>
    )
  }

  function renderGrid({ item, index }) {
    return (
      <View style={{ flexDirection: 'row', marginTop: 10 }}>
        <Box position={item[0]}/>
        <Box position={item[1]}/>
        <Box position={item[2]}/>
        <Box position={item[3]}/>
        <Box position={item[4]}/>
      </View>
    )
  }

  return (
    <View>
      <FlatList data={index} renderItem={renderGrid} keyExtractor={(item) => item[0].toString}/>
    </View>
  )
}

const styles = StyleSheet.create({
  box: {
    height: 75, 
    width: 75,
    borderColor: 'black',
    borderWidth: 3,
    alignItems: 'center',
    justifyContent: 'center',
  }
})