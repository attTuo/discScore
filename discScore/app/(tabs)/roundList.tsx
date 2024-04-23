import React, { useState, useEffect } from 'react';
import { Pressable, StyleSheet, ScrollView } from 'react-native';
import { Text, View } from '@/components/Themed';
import {storeData, getData, removeItem, RoundScore, getAllData} from '../storage';

export default function TabRoundsScreen() {
 
  const [data, setData] = useState<RoundScore>();
  const [errorMsg, setErrorMsg] = useState<string>(''); 

  const fetchData = async () => {
    try {
      setData(await getData())
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {

    fetchData()
    
  });

  return (
    <View style={styles.container}>

      <Text style={styles.title}>Saved Rounds</Text>
      <Text>{data?.name} - {data?.score}</Text>

      <Pressable style={{backgroundColor: 'blue', height: 50, width: 100}} onPress={() => removeItem()}>
        <Text>Remove item</Text>
      </Pressable>

      <ScrollView>

      </ScrollView>
     
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontSize: 35,
    fontWeight: 'bold',
  }
});