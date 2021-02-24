import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { styles as defaultStyles } from '../functions/Styles';

export default function MinesField({ mines }) {

  function renderMine({ item }) {
    return (
      <View style={{flexDirection: 'row'}}>
        <Text style={{ color: item.column1 ? 'red' : 'black' }}> X </Text>
        <Text style={{ color: item.column2 ? 'red' : 'black' }}> X </Text>
        <Text style={{ color: item.column3 ? 'red' : 'black' }}> X </Text>     
        <Text style={{ color: item.column4 ? 'red' : 'black' }}> X </Text>      
        <Text style={{ color: item.column0 ? 'red' : 'black' }}> X </Text>       
      </View>
    )
  }

  return (
      <FlatList style={{ marginTop: 20 }} data={mines} renderItem={renderMine} />
  )
}
