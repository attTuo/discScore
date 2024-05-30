import React, { useState, useEffect } from 'react';
import { Alert, Pressable, StyleSheet, ScrollView } from 'react-native';
import { Text, View } from '@/components/Themed';
import { removeRound, getAllSavedRounds, clearAll, StorageResult, PlayerScore, getAllCourses, monthNames } from '../storage';
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function TabRoundsScreen() {

	interface Dropdown {
		open: boolean,
		id: number
	}
 
  const [data, setData] = useState<StorageResult[] | undefined>([]);
  const [errorMsg, setErrorMsg] = useState<string>('');
	const [roundDropdowns, setDropdowns] = useState<boolean[]>([]);
	const [courseDropdowns, setcourseDropdowns] = useState<boolean[]>([]);
	const [courses, setCourses] = useState<string[] | undefined>([]);

	const fetchCourses = async (): Promise<void> => {

    try {

      let fetchResult: string[] | undefined = await getAllCourses();
			fetchResult !== undefined ? setCourses(fetchResult) : setErrorMsg('Problem fetching courses');

			if (courseDropdowns.length < 1) {

				courses?.forEach(course  => {
					courseDropdowns.push(false);
				});
			}

    } catch (error) {
      console.log(error);
    }
  }


  const fetchSavedRounds = async (): Promise<void> => {

    try {

			let fetchResult: StorageResult[] | undefined = await getAllSavedRounds();
			fetchResult !== undefined ? setData(fetchResult.reverse()) : setErrorMsg('Problem fetching rounds');
			
			if (roundDropdowns.length < 1) {

				data?.forEach(round  => {
					roundDropdowns.push(false);
				});
			}

    } catch (error) {
      console.log(error)
    }
  }


  useEffect(() => {

		fetchCourses();
    fetchSavedRounds();
    
  }, []);

	const createAlert = (key: string): void => {

    Alert.alert('Delete round', `Are you sure want to delete the round? Round played: ${key}`, [
      {
        text: 'Delete', 
        onPress: () => {
          removeRound(key);
          fetchSavedRounds();
        }
      },
      {
        text: 'Cancel',
        style: 'cancel',
      },
    ]);
  }


	const handleDropdowns = (index: number, todo: string, type: string): void => {

		if (todo === 'open') {
			if(type === 'course') {
				courseDropdowns.map((item, idx) => idx === index ? courseDropdowns.splice(idx, 1, true) : false);
			} else if (type === 'round') {
				roundDropdowns.map((item, idx) => idx === index ? roundDropdowns.splice(idx, 1, true) : false);
			}
			
		} else if (todo === 'close'){
				if(type === 'course') {
					courseDropdowns.map((item, idx: number) => idx === index ? courseDropdowns.splice(idx, 1, false) : false);
				}	else if (type === 'round') {
					roundDropdowns.map((item, idx: number) => idx === index ? roundDropdowns.splice(idx, 1, false) : false);
				}
		}
		
		// Refresh view on press
		fetchCourses();
		fetchSavedRounds();
	}

	const getMonth = (roundTime: string) => {

		let months: string[] = monthNames;
		let strArray: string[] = roundTime.split('');
		let monthNumber: string[] = strArray.splice(3,2);

		if (monthNumber[0] === '0'){
			monthNumber = monthNumber.splice(1,1);
		}

		return months[Number(monthNumber) - 1];
	}

  return (

    <View style={styles.container}>

			<View style={styles.topContent}>
				
				<Text style={styles.title}>Saved Rounds</Text>

				<Pressable
					onPress={() => {fetchCourses(); fetchSavedRounds();}}
					style={styles.refreshButton}
				>
					<FontAwesome size={28} name='refresh' style={{color: '#FAF9F6'}}/>
				</Pressable>
			</View>
			
			{ (data !== undefined)

				?	<ScrollView style={styles.scrollBox}>

					{courses?.map((course: string, idx : number) =>	(

						<Pressable
							onPress={() => !courseDropdowns[idx] ? handleDropdowns(idx, 'open', 'course') : handleDropdowns(idx, 'close', 'course')}
							style={styles.courseListItem}
							key={idx}
						>
							<View style={styles.upperInfo}>
								<Text style={styles.courseName}>{course}</Text>

								{	(!courseDropdowns[idx])
									?	<FontAwesome size={28} name='caret-down' style={{color: '#FAF9F6', alignSelf: 'center', marginLeft: 10}}/>
									:	<FontAwesome size={28} name='caret-up' style={{color: '#FAF9F6', alignSelf: 'center', marginLeft: 10}}/>
								}
								
							</View>

							{ (courseDropdowns[idx])

								? <ScrollView style={styles.roundScrollBox} nestedScrollEnabled={true}>

										{data?.map( (round: StorageResult, idx: number) => (
											
											<View style={styles.roundBox} key={idx}>

												{ (course === round.value.courseName)

													?	<Pressable
															onPress={() => !roundDropdowns[idx] ? handleDropdowns(idx, 'open', 'round') : handleDropdowns(idx, 'close', 'round')}
															style={styles.roundListItem}
														>
																<View style={styles.upperInfo}>

																	<View style={styles.dateTimeInfo}>
																		<Text style={styles.monthText}>{getMonth(round.value.date)}</Text>

																	</View>
																	<View style={styles.dateTimeInfo}>
																		<Text style={styles.dateTimeText}>{round.value.date}</Text>
																		<Text style={styles.dateTimeText}>{round.value.time}</Text>
																		
																	</View>
													
																	{	(!roundDropdowns[idx])	
																		?	<FontAwesome size={28} name='caret-down' style={{color: '#FAF9F6', alignSelf: 'center', marginLeft: 10, paddingLeft: 10, borderLeftWidth: 1, borderColor: 'white'}}/>
																		:<FontAwesome size={28} name='caret-up' style={{color: '#FAF9F6', alignSelf: 'center', marginLeft: 10, paddingLeft: 10, borderLeftWidth: 1, borderColor: 'white'}}/>
																	}
																	
																</View>
															
		
															{ (roundDropdowns[idx])
		
																?	<View style={styles.roundInfo}>
		
																		{round.value.players.map( (player: PlayerScore, idx: number) => (
		
																			<View style={styles.playerInfo} key={idx}>
																				<Text style={styles.playerName}>{player.playerName}</Text>
																				<Text style={styles.playerScore}>Score: {player.score}</Text>
																			</View>
																		))}
		
																		<Pressable style={styles.removeButton}
																			onPress={() => {
																				data.slice(idx - 1);
																				createAlert(data[idx].key);
																				fetchSavedRounds();
																			}}
																		>
																			<FontAwesome size={22} name='trash' style={{color: '#FAF9F6', alignSelf: 'center'}}/>
																		</Pressable>
		
																	</View>
																	
																:	<></>
															}	
														</Pressable>
													:<></>

												}		

											</View>
										))}
									</ScrollView>

								:<></>

							}
						</Pressable>

					))}

					</ScrollView>

				: <></>
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
	topContent: {
		flexDirection: 'row',
		paddingTop: 10, 
		paddingHorizontal: 20,
		alignSelf: 'center', 
		backgroundColor: '#FAF9F6', 
		paddingBottom: 10
	},
	title: {
		fontSize: 35,
		fontWeight: 'bold',
		alignSelf: 'center',
		flex: 3,
		color: '#4361ee'
	},
	refreshButton: {
		width: 20,
		height: 40,
		borderColor: '#4361ee',
		borderWidth: 5,
		borderRadius: 10,
		flex: 1,
		alignItems: 'center',
		backgroundColor: '#4361ee',
		elevation: 5
	},
	scrollBox: {
		paddingHorizontal: 20,
		flexGrow: 1
	},
	courseListItem: {
		flex: 1,
		borderColor: '#4361ee',
		borderWidth: 5,
		backgroundColor: '#4361ee',
		marginBottom: 10,
		padding: 10,
		borderRadius: 10,
		flexDirection: 'column',
		elevation: 5
	},
	roundScrollBox: {
		maxHeight: 400,
	},
	roundBox: {
		backgroundColor: '#4361ee',
	},
	roundListItem: {
		flex: 1,
		borderColor: '#FAF9F6',
		borderWidth: 1,
		backgroundColor: '#4361ee',
		marginBottom: 10,
		padding: 10,
		paddingBottom: 0,
		borderRadius: 10,
		flexDirection: 'column',
		elevation: 5
	},
	upperInfo: {
		paddingBottom: 10,
		backgroundColor: '#4361ee',
		flexDirection: 'row',
		marginBottom: 20,
		borderBottomWidth: 1,
		borderColor: '#FAF9F6',
	},
	courseName:{
		flex: 5,
		fontSize: 30,
		fontWeight: 'bold',
	},
	dateTimeInfo: {
		flex: 2,
		flexDirection: 'column',
		fontSize: 14,
		backgroundColor: '#4361ee',
		justifyContent: 'flex-end'
	},
	monthText:{
		fontSize: 22
	},
	dateTimeText: {
		alignSelf: 'flex-end',
	},
	roundInfo: {
		flexDirection: 'column',
		flexWrap: 'wrap',
		backgroundColor: '#4361ee',
		marginBottom: 10
	},
	playerInfo: {
		flex: 1,
		flexDirection: 'row',
		backgroundColor: '#4361ee',
		borderBottomWidth: 1,
		borderColor: '#FAF9F6',
		marginBottom: 5
	},
	playerName: {
		flex: 1,
		fontSize: 20,
		alignSelf: 'center'
	},
	playerScore: {
		flex: 1,
		fontSize: 16,
		alignSelf: 'flex-end',
	},
	removeButton: {
		textAlign: 'center',
		backgroundColor: '#4361ee',
		alignSelf: 'flex-end',
		alignItems: 'center',
		padding: 10,
		marginTop: 10,
		borderRadius: 10,
		borderWidth: 1,
		borderColor: '#FAF9F6',
	},
	buttonText: {
		fontSize: 16,
		color: '#FAF9F6',
		fontWeight: 'bold',
	},
	flexRow: {
		flex: 2
	},
});