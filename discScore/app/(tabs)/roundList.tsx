import React, { useState, useEffect } from 'react';
import { Pressable, StyleSheet, ScrollView } from 'react-native';
import { Text, View } from '@/components/Themed';
import { removeItem, getAllSavedRounds, clearAll, StorageResult } from '../storage';
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function TabRoundsScreen() {
 
  const [data, setData] = useState<StorageResult[] | undefined>([]);
  const [errorMsg, setErrorMsg] = useState<string>(''); 

  const fetchSavedRounds = async () => {
		
		let test: StorageResult[] | undefined = [];
		
    try {

			// Write this again
			await getAllSavedRounds() !== undefined ? setData(await getAllSavedRounds()) : setErrorMsg('Problem fetching data')

    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {

    fetchSavedRounds()
    
  }, []);

  return (

    <View style={styles.container}>

			<View style={{flexDirection: 'row', paddingTop: 10, paddingHorizontal: 20,alignSelf: 'center', backgroundColor: '#FAF9F6'}}>
				<Text style={styles.title}>Saved Rounds</Text>

				<Pressable
					onPress={fetchSavedRounds}
					style={styles.refreshButton}
				>
					<FontAwesome size={28} name='refresh' style={{color: '#FAF9F6'}}/>
				</Pressable>
			</View>

				{ (data !== undefined)

					?	<ScrollView style={styles.scrollBox}>
							{data?.map( ( round: StorageResult, idx: number) => (
						
								<View style={styles.listItem} key={idx}>
									
									<View style={styles.upperInfo}>
										<Text style={styles.courseName}>{round.value.courseName}</Text>

										<View style={styles.dateTimeStyle}>
											<Text style={styles.dateTimeStyle}>{round.value.date} </Text>
											<Text style={styles.dateTimeStyle}>{round.value.time}</Text>
										</View>
										
									</View>

									<View style={styles.roundInfo}>

										<View style={styles.infoColumn}>
											
											<Text style={styles.playerInfo}>{round.value.playerName}</Text>
											<Text style={styles.playerScore}>Score: {round.value.score}</Text>
										</View>
				
										<View style={styles.infoColumn}>
													
										</View>
									</View>		
			
									<Pressable style={styles.removeButton}
										onPress={() => {
											data.slice(idx - 1);
											removeItem(data[idx].key);
											fetchSavedRounds();
										}}
									>
										<Text style={styles.buttonText}>Remove item</Text>
									</Pressable>
								</View>
							))}
						</ScrollView>
					: <View style={styles.listItem}>
							<View style={styles.flexRow}>
								<Text style={styles.playerInfo}>Forest course</Text>
								<Text style={styles.playerInfo}>Jack</Text>
								<Text style={styles.playerInfo}>Score: 7</Text>
								<Text>12.12.2024</Text>
								<Text>12:15</Text>
							</View>
						
							<Pressable style={styles.removeButton}
								onPress={() => console.log(getAllSavedRounds())}
							>
								<Text style={styles.buttonText}>GET ALL</Text>
							</Pressable>
						</View>
				}

				<Pressable style={styles.removeButton}
					onPress={() => clearAll()}
				>
					<Text style={styles.buttonText}>CLEAR ALL ASYNC STORAGE DATA</Text>
				</Pressable>

      
     
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
		backgroundColor: '#FAF9F6'
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
		backgroundColor: '#4361ee'
	},
	scrollBox: {
		padding: 20
	},
	listItem: {
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
	upperInfo: {
		paddingBottom: 5,
		backgroundColor: '#4361ee',
		flexDirection: 'row'
	},
	courseName:{
		fontSize: 28,
		fontWeight: 'bold',
		textDecorationLine: 'underline',
	},
	dateTimeStyle: {
		fontSize: 14,
		alignSelf: 'flex-end',
		flex: 1,
		backgroundColor: '#4361ee'
	},
	roundInfo: {
		flex: 1, 
		flexDirection: 'row',
		backgroundColor: '#4361ee'
	},
	infoColumn: {
		flex: 1,
		flexDirection: 'column',
		backgroundColor: '#4361ee',
	},
	playerInfo: {
		flex: 1,
		fontSize: 24
	},
	playerScore: {
		flex: 1,
		fontSize: 16
	},
	removeButton: {
		textAlign: 'center',
		backgroundColor: '#3a0ca3',
		alignSelf: 'flex-end',
		alignItems: 'center',
		padding: 10,
		borderRadius: 10,
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