import React, { useState, useEffect } from 'react';
import { Pressable, StyleSheet, ScrollView } from 'react-native';
import { Text, View } from '@/components/Themed';
import { removeItem, getAllSavedRounds, clearAll, StorageResult } from '../storage';

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

			<View style={{flexDirection: 'row', paddingTop: 10, paddingHorizontal: 20,alignSelf: 'center'}}>
				<Text style={styles.title}>Saved Rounds</Text>

				<Pressable
					onPress={fetchSavedRounds}
					style={styles.refreshButton}
				>
					<Text>Refresh</Text>
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
    flex: 1
	},
	title: {
		fontSize: 35,
		fontWeight: 'bold',
		alignSelf: 'center',
		flex: 3
	},
	refreshButton: {
		width: 30,
		height: 30,
		borderColor: 'green',
		borderWidth: 2,
		flex: 1,
		alignItems: 'center',
		backgroundColor: 'blue'
	},
	scrollBox: {
		padding: 20
	},
	listItem: {
		flex: 1,
		borderColor: 'purple',
		borderWidth: 3,
		backgroundColor: 'green',
		marginBottom: 10,
		padding: 10,
		borderRadius: 10,
		flexDirection: 'column'
	},
	upperInfo: {
		paddingBottom: 5,
		backgroundColor: 'green',
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
		backgroundColor: 'green'
	},
	roundInfo: {
		flex: 1, 
		flexDirection: 'row',
		backgroundColor: 'green'
	},
	infoColumn: {
		flex: 1,
		flexDirection: 'column',
		backgroundColor: 'green',
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
		backgroundColor: 'blue',
		alignSelf: 'flex-end',
		alignItems: 'center',
		padding: 10,
		borderRadius: 10,
	},
	buttonText: {
		fontSize: 16
	},
	flexRow: {
		flex: 2
	}
});