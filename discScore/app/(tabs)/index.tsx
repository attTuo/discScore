import { Pressable, ScrollView, StyleSheet, TextInput, View } from 'react-native';
import React, { useState } from 'react';
import { Text } from '@/components/Themed';

export default function TabIndexScreen() {

  const [groupSize, setGroupSize] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [group, setGroup] = useState<number[]>([]);

  const intializePlayers = (num: number): void => {

    setGroup([]);
    
    const arr: number[] = [];

    for (let i: number = 0;i < num; i++) {
      arr.push(i + 1);
    }

    setGroup(arr);
    setGroupSize(num);
  }

  const countScore = (num: number, operation: string): void => {

    let newScore: number = score;

    if (operation === 'subtract') {
      newScore = newScore - num;
    }
    else if (operation === 'add') {
      newScore = newScore + num;
    }

    setScore(newScore);
  }
  
  return (
    <View style={styles.container}>

      { (groupSize == 0 || group.length < 1)
        ? <View style={styles.container}>

            <Text style={styles.title}>Choose group size</Text>

            <View style={styles.boxholder}>

              <Pressable style={styles.box}
                onPress={() => intializePlayers(1)}
              >
                <Text style={styles.largeNumber}>1</Text>
              </Pressable>

              <Pressable style={styles.box}
                onPress={() => intializePlayers(2)}
              >
                <Text style={styles.largeNumber}>2</Text>
              </Pressable>

              <Pressable style={styles.box}
                onPress={() => intializePlayers(3)}
              >
                <Text style={styles.largeNumber}>3</Text>
              </Pressable>

              <Pressable style={styles.box}
                onPress={() => intializePlayers(4)}
              >
                <Text style={styles.largeNumber}>4</Text>
              </Pressable>

              <Pressable style={styles.box}
                onPress={() => intializePlayers(5)}
              >
                <Text style={styles.largeNumber}>5</Text>
              </Pressable> 

              <View style={styles.box}>
                <TextInput
                  inputMode='numeric'
                  defaultValue='+'
                  placeholderTextColor='#eee'
                  keyboardType='number-pad'
                  onChangeText={ newSize => intializePlayers(Number(newSize))}
                  textAlign='center'
                  style={styles.inputStyle}
                />
              </View>   
            </View>
          </View>

        : <View style={styles.container}>

            <Text style={styles.title}>Scoreboard</Text>
            <Text style={styles.title}>Players: {groupSize.toString()}</Text>
            
            <ScrollView style={styles.scrollBox}>

              {group.map((personId: number, idx: number) => (

                <View style={styles.scoreCard} key={idx}>

                  <View style={{flex: 1}}>
                    <Text style={styles.playerName}>Player {personId} name</Text>
                  </View>

                  <View style={styles.scoreCardContent}>

                    <Pressable style={styles.scoreButton}
                      onPress={() => countScore(2, 'subtract')}
                    >
                      <Text style={styles.buttonText}>-2</Text>
                    </Pressable>

                    <Pressable style={styles.scoreButton}
                      onPress={() => countScore(1, 'subtract')}
                    >
                      <Text style={styles.buttonText}>-1</Text>
                    </Pressable>

                    <Pressable style={styles.scoreButton}>
                      <Text style={styles.buttonText}>{score.toString()}</Text>
                    </Pressable>

                    <Pressable style={styles.scoreButton}
                      onPress={() => countScore(1, 'add')}
                    >
                      <Text style={styles.buttonText}>+1</Text>
                    </Pressable>

                    <Pressable style={styles.scoreButton}
                      onPress={() => countScore(2, 'add')}
                    >
                      <Text style={styles.buttonText}>+2</Text>
                    </Pressable>
                  </View>
                </View>
              ))}
            </ScrollView>
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
    alignSelf: 'center'
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
  },
  inputStyle: {
    height: 120,
    borderColor: 'grey',
    borderWidth: 5,
    fontSize: 80,
    color: '#eee',
    textAlign: 'center'
  },
  scrollBox: {
    marginTop: 20
  },
  scoreCard: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#eee',
    paddingVertical: 5
  },
  playerName: {
    fontSize: 25,
  },
  scoreCardContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    fontSize: 30,
    fontWeight: 'bold',
    alignSelf: 'center'
  },
  scoreButton: {
    width: 50,
    height: 50,
    borderWidth: 2,
    borderColor: '#eee',
    textAlign: 'center',
    margin: 5
  }
});
