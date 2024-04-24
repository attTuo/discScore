import React, { useState, useEffect } from 'react';
import { Pressable, StyleSheet, ScrollView } from 'react-native';
import { Text, View } from '@/components/Themed';
import {storeData, getData, removeItem, RoundScore, getAllData, clearAll} from '../storage';

export default function TabRoundsScreen() {
 
  const [data, setData] = useState<RoundScore>();
  const [errorMsg, setErrorMsg] = useState<string>(''); 

  const fetchData = async () => {
    try {
      setData(await getData())
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {

    fetchData()
    
  });

  return (
    <View style={styles.container}>

      <Text style={styles.title}>Saved Rounds</Text>
      
      <ScrollView style={styles.scrollBox}>

        <View style={styles.listItem}>

					<Text style={styles.playerName}>{data?.name}</Text>
					<Text>Score: {data?.score}</Text>

					<Pressable style={styles.removeButton}
						onPress={() => removeItem()}
					>
						<Text style={styles.buttonText}>Remove item</Text>
					</Pressable>
        </View>

				<View style={styles.listItem}>

					<Text style={styles.playerName}>{data?.name}</Text>
					<Text>Score: {data?.score}</Text>

					<Pressable style={styles.removeButton}
						onPress={() => removeItem()}
					>
						<Text style={styles.buttonText}>Remove item</Text>
					</Pressable>
        </View>

				<Pressable style={styles.removeButton}
					onPress={() => clearAll()}
				>
					<Text style={styles.buttonText}>CLEAR ALL ASYNC STORAGE DATA</Text>
				</Pressable>

      </ScrollView>
     
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
		alignSelf: 'center'
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
		borderRadius: 10
	},
	playerName: {
		fontSize: 24
	},
	removeButton: {
		textAlign: 'center',
		backgroundColor: 'blue',
		alignSelf: 'flex-end',
		alignItems: 'center',
		padding: 10,
		borderRadius: 10
	},
	buttonText: {
		fontSize: 16
	}
});