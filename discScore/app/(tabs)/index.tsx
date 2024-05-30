import { Pressable, ScrollView, StyleSheet, TextInput, View, Modal, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Text } from '@/components/Themed';
import { storeRound, StorageResult, storeCourse, getAllCourses, getAllSavedRounds, RoundScore, PlayerScore, removeRound, removeCourse } from '../storage';
import {format} from 'date-fns';
import FontAwesome from '@expo/vector-icons/FontAwesome';

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
  const [selectedCourse, setSelectedCourse] = useState<string>('Select a course...');
  const [courses, setCourses] = useState<string[] | undefined>([]);
  const [errorMsg, setErrorMsg] = useState<string>(''); 
  const [newCourse, setNewCourse] = useState<string>('');
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [courseModalVisible, setCourseModalVisible] = useState(false);

  const fetchData = async () => {

    try {

      let fetchResult: string[] | undefined = await getAllCourses();
			fetchResult !== undefined ? setCourses(fetchResult) : setErrorMsg('Problem fetching data');

    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {

    fetchData()

  },[]);

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

  const handleRoundSave = (): void => {

    const playerScores: PlayerScore[] = [];

    group.map( (player: Player) => (
      playerScores.push(
        {
          playerName: player.name,
          score: player.score.toString()
        }
      )
    ));

    storeRound({
      courseName: selectedCourse?.toString(),
      date: `${format(new Date(),'dd.MM.y').toString()}`,
      time: `${format(new Date(),'HH:mm').toString()}`,
      players: playerScores
    });

    setGroupSize(0);
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

  const createAlert = (courseName : string) => {

    Alert.alert('Delete course', `Are you sure you want to delete course: ${courseName} ?`, [
      {
        text: 'Delete', 
        onPress: () => {
          removeCourse(courseName);
          fetchData();
        }
      },
      {
        text: 'Cancel',
        style: 'cancel',
      },
    ]);
  }

  return (

    <View style={styles.container}>

      { (groupSize == 0 || group.length < 1)
        ? <View>

            <View style={styles.courseInputs}>

            <Pressable
              onPress={() => setCourseModalVisible(true)}
              style={styles.pickerBox}
            >
              <Text>{selectedCourse}</Text>
            </Pressable>

              { (courses)
                ? <View>

                    <Modal
                      animationType="slide"
                      transparent={true}
                      visible={courseModalVisible}
                      onRequestClose={() => {
                        setCourseModalVisible(!courseModalVisible);
                      }}
                    >
                      <View style={styles.centeredView}>

                        <View style={styles.modalView}>

                          <Pressable
                            style={styles.closeModalButton}
                            onPress={() => setCourseModalVisible(!courseModalVisible)}
                          >
                            <FontAwesome size={20} name='close' style={{color: '#4361ee'}}/>
                          </Pressable>


                          <Text style={styles.modalText}>Courses:</Text>

                          <ScrollView style={styles.modalScrollView}>

                            {courses.map((course: string, idx : number) => (
                              <View style={styles.courseListItem} key={idx}>
                                <Pressable 
                                  style={styles.courseListItemInfo} 
                                  onPress={() => {
                                    setSelectedCourse(course);
                                    setCourseModalVisible(!courseModalVisible);
                                  }}
                                >
                                  <Text style={styles.courseListName}>{course}</Text>

                                  <Pressable
                                    onPress={() => createAlert(course)}
                                    style={styles.deleteCourse}
                                  >
                                    <FontAwesome size={20} name='trash' style={{color: '#FAF9F6', alignSelf: 'center'}}/>
                                  </Pressable>
                                </Pressable>
                              </View>
                            ))}
                          </ScrollView>
                        </View>
                      </View>
                    </Modal>
                  </View>
                :<></>
              }

              
                <Modal
                  animationType="slide"
                  transparent={true}
                  visible={addModalVisible}
                  onRequestClose={() => {
                    setAddModalVisible(!addModalVisible);
                  }}
                >
                  <View style={styles.centeredView}>

                    <View style={styles.modalView}>

                      <Pressable
                        style={styles.closeModalButton}
                        onPress={() => setAddModalVisible(!addModalVisible)}
                      >
                        <FontAwesome size={20} name='close' style={{color: '#4361ee'}}/>
                      </Pressable>
                    
                      <Text style={styles.modalText}>Add a new course:</Text>

                      <View style={styles.courseAdder}>
                        <TextInput
                          selectTextOnFocus={true}
                          placeholderTextColor= '#4361ee'
                          autoCorrect={false}
                          placeholder='Forest Course Am, Etc. ...'
                          selectionColor='#4361ee'
                          value={newCourse}
                          style={styles.courseAdderInput}
                          onChangeText={newName => setNewCourse(newName)}
                          onSubmitEditing={() => {
                            storeCourse(newCourse);
                            setNewCourse('');
                            fetchData();
                          }}
                        />
                      </View>

                    </View>
                  </View>
                </Modal>

                <Pressable
                  style={styles.modalButton}
                  onPress={() => setAddModalVisible(true)}>
                  <FontAwesome size={30} name='plus' style={{color: '#FAF9F6', alignSelf: 'center'}}/>
                </Pressable>
              

            </View>

            <Text style={{color: '#4361ee', alignSelf: 'center'}}>Select the number of players:</Text>

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

                 
            <View style={styles.topInfo}>
              <Text style={styles.title}>{selectedCourse}</Text> 
              <Pressable 
                style={styles.saveRoundButton}
                onPress={() => {
                  handleRoundSave();
                  getAllSavedRounds();
                }}
              >
                <Text style={styles.saveRoundButtonContent}>Save Round</Text>
              </Pressable>
            </View>
            <Text style={{color: '#4361ee', marginLeft: 20}}>Group size: {groupSize.toString()}</Text>

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
                        placeholderTextColor='#caf0f8'
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
    backgroundColor: '#FAF9F6',
    paddingTop: 10
  },
  courseInputs: {
    paddingHorizontal: 20,
    flexDirection: 'row',
    marginBottom: 25
  },
  pickerBox: {
    flex: 6,
    height: 65,
    backgroundColor: '#4361ee',
    borderWidth: 5, 
    borderColor: '#4361ee', 
    borderRadius: 10,
    marginTop: 25,
    elevation: 5,
    justifyContent: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10
  },
  coursePicker: {
    backgroundColor: '#4361ee',
    color: '#FAF9F6',
  },
  courseListItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    padding: 5,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: '#FAF9F6'
  },
  courseListName: {
    flex: 7,
    fontSize: 20,
    alignSelf: 'flex-start',
  },
  courseListItemInfo: {
    flexDirection: 'row',
  },
  deleteCourse: {
    flex: 1,
    borderLeftWidth: 1,
    borderColor: '#FAF9F6',
    justifyContent: 'center',
    flexDirection: 'column',
    marginLeft: 10
  },

  // Modal
  modalButton: {
    flex: 1,
    height: 65,
    borderRadius: 10,
    padding: 10,
    elevation: 5,
    backgroundColor: '#4361ee',
    marginLeft: 10,
    justifyContent: 'center',
    alignSelf: 'flex-end'
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    width: '90%',
    backgroundColor: '#4361ee',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    borderWidth:2,
    borderColor: '#4cc9f0',
    elevation: 5,
    maxHeight: '80%'
  },
  closeModalButton: {
    alignSelf: 'flex-end',
    backgroundColor: '#FAF9F6',
    padding: 7,
    borderRadius: 10,
    borderWidth:2,
    borderColor: '#4cc9f0',
    elevation: 5,
  },
  modalText: {
    fontSize: 30,
    marginBottom: 15,
    color: '#FAF9F6',
    fontWeight: 'bold',
  },
  courseAdder: {
    backgroundColor: '#FAF9F6',
    borderWidth: 2,
    borderRadius: 10,
    width: '100%',
    borderColor: '#4cc9f0',
    elevation: 5
  },
  courseAdderInput: {
    fontSize: 20,
    paddingLeft: 20,
    paddingVertical: 15,
    color: '#4361ee'
  },
  modalScrollView: {
    marginTop: 10
  },

  // Starting view
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
    width: 135,
    height: 135,
    padding: 10,
    margin: 20,
    borderColor: '#4361ee',
    borderWidth: 5,
    alignContent: 'center',
    borderRadius: 10,
    backgroundColor: '#4361ee',
    elevation: 5
  },
  largeNumber: {
    textAlign: 'center',
    fontSize: 70,
    fontWeight: 'bold',
    color: '#FAF9F6',
  },
  inputStyle: {
    height: 105,
    borderColor: '#FAF9F6',
    borderWidth: 5,
    borderRadius: 10,
    fontSize: 70,
    color: '#FAF9F6',
    textAlign: 'center',
  },

  //Scorecard view
  topInfo: {
    flexDirection: 'row',
    marginHorizontal: 20,
  },
  title: {
    flex: 5,
    fontSize: 30,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginTop: 10,
    color: '#4361ee'
  },
  saveRoundButton: {
    flex: 1,
    justifyContent: 'center',
    padding: 5,
    marginTop: 10,
    borderRadius: 10,
    backgroundColor: '#4361ee',
    elevation: 5,
  },
  saveRoundButtonContent: {
    alignSelf: 'center'
  },
  scrollBox: {
    flex: 1,
    marginTop: 20,
    paddingHorizontal: 20
  },
  scoreCard: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    borderWidth: 5,
    borderColor: '#4361ee',
    padding: 7,
    marginBottom: 20,
    borderRadius: 10,
    backgroundColor: '#4361ee'
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
    borderColor: '#FAF9F6',
    margin: 5,
    borderRadius: 10
  },
  nameInput: {
    fontSize: 30,
    color:'#FAF9F6',
    marginLeft: 5,
    paddingBottom: 5
  },
  playerScore: {
    flex: 1,
    fontSize: 50,
    borderWidth: 2,
    borderColor: '#FAF9F6',
    color: '#4361ee',
    textAlign: 'center',
    margin: 5,
    borderRadius: 10,
    backgroundColor: '#FAF9F6'
  },
  scoreCardContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10
  },
  scoreButton: {
    flex: 1,
    borderWidth: 2,
    borderColor: '#FAF9F6',
    textAlign: 'center',
    marginHorizontal: 5,
    borderRadius: 10
  },
  buttonText: {
    fontSize: 25,
    fontWeight: 'bold',
    alignSelf: 'center',
    padding: 5,
  },
  scoreInput: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
    padding: 5,
  },
});
