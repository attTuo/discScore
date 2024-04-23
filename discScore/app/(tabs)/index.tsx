import { Pressable, ScrollView, StyleSheet, TextInput, View } from 'react-native';
import React, { useState } from 'react';
import { Text } from '@/components/Themed';
import {storeData, getData, removeItem} from '../storage';

export default function TabIndexScreen() {

  interface Player {
    name: string,
    score: number,
    id: number,
    scoreToAdd: string
  }

  const [groupSize, setGroupSize] = useState<number>(0);
  const [scoreSize, setScoreSize] = useState<number>(0);
  const [customGroupSize, setCustomGroupSize] = useState<number>(0);
  const [scoreToAdd, setScoreToAdd] = useState<number>(0);
  const [group, setGroup] = useState<Player[]>([]);

  const intializePlayers = (numberOfPlayers: number): void => {
    
    const players: Player[] = [];

    for (let i: number = 0; i < numberOfPlayers; i++) {
      players.push(
        {
          name: `Player ${i + 1}`,
          score: 0,
          id: i + 1,
          scoreToAdd: '+/-'
        }
      );
    }
    setGroup(players);
    setGroupSize(numberOfPlayers);
  }

  const countScore = (num: number, operation: string, player: Player): void => {

    let arrIdx = player.id - 1;
    let newScore: number = group[arrIdx].score;

    if (Number.isInteger(num)) {

      if (operation === 'subtract') {
        newScore = newScore - num;
      }
      else if (operation === 'add') {
        newScore = newScore + num;
      }
    }

    group[arrIdx].score = newScore;
    group[arrIdx].scoreToAdd = '+/-';

    /*
      This doesn't do anything, but it is left here to refresh the view. Definitely not ideal but adding user input scores now works as intended.
      You can see the number as you edit, and the Pressable turns to default - '+/-' - onSubmitEditing.
    */
      setScoreToAdd(newScore); 
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
                  selectTextOnFocus={true}
                  inputMode='numeric'
                  defaultValue='+'
                  keyboardType='number-pad'
                  onChangeText={newSize => setCustomGroupSize(Number(newSize))}
                  onSubmitEditing={() => {
                    if(customGroupSize <= 99 && Number.isInteger(customGroupSize))
                    intializePlayers(customGroupSize)
                  }}
                  textAlign='center'
                  style={styles.inputStyle}
                />
              </View>   
            </View>
          </View>

        : <View style={styles.container}>

            <Text style={styles.title}>Group size: {groupSize.toString()}</Text>
            
            <ScrollView style={styles.scrollBox}>

              {group.map((player: Player, idx: number) => (

                <View style={styles.scoreCard} key={idx}>

                  <View style={styles.playerInfo}>

                    <View style={styles.playerName}>
                      <TextInput
                        selectTextOnFocus={true}
                        defaultValue={`${player.name}`}
                        onChangeText={newName => {group[player.id - 1].name = newName}}
                        style={styles.nameInput}
                      />  
                    </View>
                    
                    <Text style={styles.playerScore}>{player.score}</Text>
                  </View>

                  <View style={styles.scoreCardContent}>

                    <Pressable style={styles.scoreButton}
                      onPress={() => countScore(2, 'subtract', player)}
                    >
                      <Text style={styles.buttonText}>-2</Text>
                    </Pressable>

                    <Pressable style={styles.scoreButton}
                      onPress={() => countScore(1, 'subtract', player)}
                    >
                      <Text style={styles.buttonText}>-1</Text>
                    </Pressable>

                    <View style={styles.scoreButton}>
                      <TextInput
                        selectTextOnFocus={true}
                        inputMode='numeric'
                        value={player.scoreToAdd}
                        placeholderTextColor='#eee'
                        keyboardType='number-pad'
                        textAlign='center'
                        onChangeText={(newScore) => {

                          if(Number.isInteger(Number(newScore)) || newScore == '-') {
                            setScoreSize(Number(newScore));
                            player.scoreToAdd = newScore;
                          } else {
                            setScoreSize(0);
                            player.scoreToAdd = newScore;
                          }
                        }}
                        onSubmitEditing={() => countScore(scoreSize, 'add', player)}
                        style={styles.scoreInput}
                      />
                    </View> 

                    <Pressable style={styles.scoreButton}
                      onPress={() => countScore(1, 'add', player)}
                    >
                      <Text style={styles.buttonText}>+1</Text>
                    </Pressable>

                    <Pressable style={styles.scoreButton}
                      onPress={() => countScore(2, 'add', player)}
                    >
                      <Text style={styles.buttonText}>+2</Text>
                    </Pressable>
                    
                  </View>
                  <View>
                    <Pressable style={styles.scoreButton}
                      onPress={() => storeData({
                        name: player.name, 
                        score: player.score
                      })}
                    >
                      <Text> Save Score </Text>
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
    alignSelf: 'center',
    marginTop: 15,
    marginBottom: 20
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
    borderRadius: 10
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
    fontSize: 75,
    color: 'white',
    textAlign: 'center',
    borderRadius: 10
  },
  scrollBox: {
    marginTop: 20
  },
  scoreCard: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#eee',
    padding: 7,
    marginBottom: 20,
    borderRadius: 10
  },
  playerInfo: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    alignItems: 'flex-start'
  },
  playerName: {
    flex: 3,
    borderWidth: 2,
    borderColor: '#eee',
    margin: 5,
    borderRadius: 10
  },
  nameInput: {
    fontSize: 30,
    color:'white',
    marginLeft: 5,
    paddingBottom: 5
  },
  playerScore: {
    flex: 1,
    fontSize: 50,
    borderWidth: 2,
    borderColor: '#eee',
    textAlign: 'center',
    margin: 5,
    borderRadius: 10,
    backgroundColor: 'green'
  },
  scoreCardContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    fontSize: 35,
    fontWeight: 'bold',
    alignSelf: 'center'
  },
  scoreButton: {
    width: 60,
    height: 60,
    borderWidth: 2,
    borderColor: '#eee',
    textAlign: 'center',
    margin: 5,
    borderRadius: 10
  },
  scoreInput: {
    fontSize: 35,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white'
  }
});
