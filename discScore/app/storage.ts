import AsyncStorage from '@react-native-async-storage/async-storage';
import { KeyValuePair } from '@react-native-async-storage/async-storage/lib/typescript/types';

export interface RoundScore {
  courseName?: string,
  date: string,
  time: string,
	players: PlayerScore[]
}

export interface PlayerScore {
  playerName: string,
  score: string
}

export interface StorageResult {
  key: string,
  value: RoundScore
}
  

export const storeCourse = async (value: string) => {
  
  try {
    await AsyncStorage.setItem(`${value}`, 'course');
    console.log('Course added');
  } catch (error) {
    console.log(error);
  }
};

export const getAllCourses = async () => {

  let courses: string[] = [];

	try {
		const keys = await AsyncStorage.getAllKeys();
		const result = await AsyncStorage.multiGet(keys);
    
    if (result) {

      result.map((item: KeyValuePair) => (

        (item[1] === 'course')
        ? courses.push(item[0])
        : void(0) 
      ))
    }
		return courses;

	} catch (error) {
		console.error(error);
	}
}

export const storeRound = async (value: RoundScore) => {
  
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(`${value.date}-${value.time}`, jsonValue);
    console.log('Item added');

  } catch (error) {
    console.log(error);
  }
};

export const getData = async () => {

  try {
    const jsonValue = await AsyncStorage.getItem('round-key');
    return jsonValue != null ? JSON.parse(jsonValue) : null;

  } catch (error) {
    console.log(error);
  }
}

export const getAllSavedRounds = async () => {

  let rounds: StorageResult[] = [];

	try {
		const keys = await AsyncStorage.getAllKeys();
		const result = await AsyncStorage.multiGet(keys);
    
    if (result) {

      result.map( (item: KeyValuePair) => (

        (item[1] !== null && item[1] !== 'course')
        ? rounds.push({
            key: item[0],
            value: JSON.parse(item[1])
          })
        : void(0)
      ))
    }
		return rounds;

	} catch (error) {
		console.error(error);
	}
}

export const removeItem = async (key: string) => {

  try {
    await AsyncStorage.removeItem(`${key}`)
  } catch(error) {
    console.log(error)
  }
  console.log('Item removed.')
}

export const clearAll = async () => {
  
  try {
    await AsyncStorage.clear();
  } catch(error) {
    console.log(error);
  }
  console.log('Cleared all AsyncStorage data');
}