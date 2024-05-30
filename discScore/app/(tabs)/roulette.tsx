import React, { useState, useEffect } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Text, View } from '@/components/Themed';
import { shotArray, shapeArray, discArray } from '../storage';

export default function TabRouletteScreen() {

  const [shot, setShot] = useState<string>('');
  const [shape, setShape] = useState<string>('');
  const [disc, setDisc] = useState<string>('');

  // Function for getting a random value from each array
  const rollRandom = (): void => {

    setShot(shotArray[ getRandomInt(shotArray.length) ]);
    setShape(shapeArray[ getRandomInt(shapeArray.length) ]);
    setDisc(discArray[ getRandomInt(discArray.length) ]);
  }

  // Function for getting a random number from 0 to number given as a parameter
  const getRandomInt = (arraySize: number): number => {

    return Math.floor(Math.random() * arraySize);
  }


  return (

    <View style={styles.container}>

      <View style={styles.topContent}>
        <FontAwesome style={styles.bigIcon} name='dashboard'/>
        <Text style={styles.title}>Roulette</Text>
      </View>

      <View style={styles.separator} lightColor="#4361ee" darkColor="#4361ee" />

      <View style={styles.rouletteContent}>

        { (!shot && !shape && !disc)
        
          ? <View style={styles.throwInfo}>
              <Text style={styles.text}>Press the button for a randomized shot!</Text>
            </View>

          : <View style={styles.throwInfo}>
              <Text style={styles.title}>Throw</Text>
              <Text style={styles.text}>{shot} - {shape}</Text>
              <Text style={styles.title}>With</Text>
              <Text style={styles.text}>{disc}</Text>
            </View>  
        }

        <Pressable 
          style={styles.rollButton}
          onPress={rollRandom}
        >
          <View style={styles.buttonContent}>
            <Text style={styles.buttonText}>Roll</Text>
            <FontAwesome style={styles.smallIcon} name='refresh'/>
          </View>
        </Pressable>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FAF9F6',
    paddingHorizontal: 20,
    flexDirection: 'column',
    paddingTop: 20
  },
  topContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FAF9F6',
    paddingTop: 50
  },
  bigIcon: {
    fontSize: 100,
    color: '#4361ee',
  },
  title: {
    fontSize: 35,
    fontWeight: 'bold',
    color: '#4361ee'
  },

  //------------------------------
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },

  //------------------------------
  rouletteContent: {
    flex: 4,
    backgroundColor: '#FAF9F6',
    flexDirection: 'column',
    width: '100%'
  },
  throwInfo: {
    flex:3,
    backgroundColor: '#FAF9F6',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 50
  },
  text: {
    fontSize: 25,
    fontStyle: 'italic',
    color: '#4361ee',
    backgroundColor: '#FAF9F6',
    textAlign: 'center'
  },
  rollButton: {
    flex: 1,
    width: '100%',
    alignSelf: 'center',
  },
  buttonContent: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#4361ee',
    borderWidth: 5,
    borderColor: '#4361ee',
    borderRadius: 10,
    padding: 10,
    elevation: 5
  },
  buttonText:{
    fontSize: 25,
    fontWeight: 'bold',
    alignSelf: 'center',
    color: '#FAF9F6'
  },
  smallIcon: {
    fontSize: 30,
    alignSelf: 'center',
    marginLeft: 10,
    color: '#FAF9F6'
  }
});
