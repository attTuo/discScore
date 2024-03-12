import { Pressable, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { Text, View } from '@/components/Themed';

export default function TabIndexScreen() {

  const [groupSize, setGroupSize] = useState<Number>(0);

  
  return (
    <View style={styles.container}>

      { (groupSize == 0)
      ? <View style={styles.container}>
          <Text style={styles.title}>Choose group size</Text>
          <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />

          <View style={styles.boxholder}>
            <Pressable style={styles.box}>
              <Text style={styles.largeNumber}>1</Text>
            </Pressable>
            <Pressable style={styles.box}>
              <Text style={styles.largeNumber}>2</Text>
            </Pressable>
            <Pressable style={styles.box}>
              <Text style={styles.largeNumber}>3</Text>
            </Pressable>
            <Pressable style={styles.box}>
              <Text style={styles.largeNumber}>4</Text>
            </Pressable>
            <Pressable style={styles.box}>
              <Text style={styles.largeNumber}>5</Text>
            </Pressable>
            <Pressable style={styles.box}>
              <Text style={styles.largeNumber}>+</Text>
            </Pressable>
          </View>
        </View>

      : <View style={styles.container}>
          <Text style={styles.title}>Scoreboard</Text>
          <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
        </View>
      }
    </View>  
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 20
  },
  separator: {
    marginTop: 30,
    marginBottom: 10,
    height: 1,
    width: '80%',
  },
  boxholder: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    flexWrap: 'wrap',
    marginTop: 0,
    marginBottom: 0,
  },
  box: {
    width: 150,
    height: 150,
    padding: 10,
    margin: 20,
    borderColor: 'grey',
    borderWidth: 5,
    alignContent: 'center',
  },
  largeNumber: {
    textAlign: 'center',
    fontSize: 80,
    fontWeight: 'bold',
  }
});