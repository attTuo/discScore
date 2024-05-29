import React, { useState, useEffect } from 'react';
import { Pressable, StyleSheet, ScrollView } from 'react-native';
import { Text, View } from '@/components/Themed';
import { removeRound, getAllSavedRounds, clearAll, StorageResult, PlayerScore } from '../storage';
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function TabRoundsScreen() {
 
  const [data, setData] = useState<StorageResult[] | undefined>([]);
  const [errorMsg, setErrorMsg] = useState<string>(''); 

  const fetchSavedRounds = async () => {

    try {

			let fetchResult: StorageResult[] | undefined = await getAllSavedRounds();
			fetchResult !== undefined ? setData(fetchResult.reverse()) : setErrorMsg('Problem fetching data');

    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {

    fetchSavedRounds()
    
  }, []);

  return (

    <View style={styles.container}>

			<View style={{flexDirection: 'row', paddingTop: 10, paddingHorizontal: 20,alignSelf: 'center', backgroundColor: '#FAF9F6', paddingBottom: 10}}>
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

										<View style={styles.dateTimeInfo}>
											<Text style={styles.dateTimeText}>{round.value.date}</Text>
											<Text style={styles.dateTimeText}>{round.value.time}</Text>
										</View>
									</View>

									<View style={styles.roundInfo}>

										{round.value.players.map( (player: PlayerScore, idx: number) => (

											<View style={styles.playerInfo} key={idx}>
												<Text style={styles.playerName}>{player.playerName}</Text>
												<Text style={styles.playerScore}>Score: {player.score}</Text>
											</View>
										))}

									</View>		
			
									<Pressable style={styles.removeButton}
										onPress={() => {
											data.slice(idx - 1);
											removeRound(data[idx].key);
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
								<Text style={styles.playerName}>Forest course</Text>
								<Text style={styles.playerName}>Jack</Text>
								<Text style={styles.playerName}>Score: 7</Text>
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
		backgroundColor: '#FAF9F6',
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
		paddingHorizontal: 20,
		flexGrow: 1
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
		paddingBottom: 10,
		backgroundColor: '#4361ee',
		flexDirection: 'row',
		marginBottom: 10
	},
	courseName:{
		flex: 5,
		fontSize: 28,
		fontWeight: 'bold',
		textDecorationLine: 'underline',
	},
	dateTimeInfo: {
		flex: 2,
		flexDirection: 'column',
		fontSize: 14,
		backgroundColor: '#4361ee',
		justifyContent: 'flex-start'
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
		borderColor: '#FAF9F6'
	},
	playerName: {
		flex: 1,
		fontSize: 24
	},
	playerScore: {
		flex: 1,
		fontSize: 16,
		alignSelf: 'center'
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