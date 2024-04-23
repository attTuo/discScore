import React, { useState, useEffect } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Text, View } from '@/components/Themed';
import {storeData, getData, removeItem, RoundScore, getAllData} from '../storage';

export default function TabRouletteScreen() {

  const shotArray: string[] = [
    'Backhand',
    'Forehand',
  ];
  const shapeArray: string[] = [
    'Hyzer',
    'Anhyzer',
    'Roller'
  ];
  const discArray: string[] = [
    'a putter',
    'a midrange',
    'a fairway driver',
    'a distance driver',
    'the most UNDERSTABLE disc in your bag',
    'the most OVERSTABLE disc in your bag',
    'any disc, but with your NON-DOMINANT hand',
    'any disc',
    'a mini (marker disc)',
    'any disc, but with the disc UPSIDE DOWN',
    'a disc decided by the previous player'
  ];

  const [shot, setShot] = useState<string>('');
  const [shape, setShape] = useState<string>('');
  const [disc, setDisc] = useState<string>('');
  const [data, setData] = useState<RoundScore>();
  const [errorMsg, setErrorMsg] = useState<string>('');

  const rollRandom = (): void => {

    setShot(shotArray[ getRandomInt(shotArray.length) ]);
    setShape(shapeArray[ getRandomInt(shapeArray.length) ]);
    setDisc(discArray[ getRandomInt(discArray.length) ]);
  }

  const getRandomInt = (arraySize: number): number => {
    return Math.floor(Math.random() * arraySize);
  }

  

  useEffect(() => {

    const fetchData = async () => {
      try {
        setData(await getData())
      } catch (error) {
        console.log(error)
      }
    }

    setErrorMsg('');

    if(data){
      
      fetchData()
    } else {
      setErrorMsg('Failed to fetch data');
    }

  }, [data]);

  return (
    <View style={styles.container}>

      <Text style={styles.title}>Roulette</Text>
      {(errorMsg != '') ? <Text>{errorMsg}</Text> : <Text>{data?.name} - {data?.score}</Text>}
      <Pressable style={{backgroundColor: 'blue', height: 100, width: 100}} onPress={() => removeItem()}></Pressable>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />

      <View style={styles.rouletteContent}>

        <FontAwesome style={styles.icon} name='dashboard'/>
        
        { (!shot && !shape && !disc)
        
          ? <View>
              <Text style={styles.text}>Press the button for a randomized shot!</Text>
            </View>

          : <View style={styles.rouletteContent}>
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
    justifyContent: 'center'
  },
  title: {
    fontSize: 35,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  rouletteContent: {
    alignItems: 'center'
  },
  text: {
    fontSize: 25,
    fontStyle: 'italic'
  },
  icon: {
    fontSize: 100,
    marginBottom: 50
  },
  rollButton: {
    height: 75,
    width: 300,
    borderWidth: 2,
    borderColor: 'black',
    marginTop: 50,
    justifyContent: 'center',
  },
  buttonContent: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: 'lightblue'
  },
  buttonText:{
    fontSize: 25,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  smallIcon: {
    fontSize: 30,
    alignSelf: 'center',
    marginLeft: 10
  }
});
