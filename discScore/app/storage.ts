import { KeyValuePair } from '@react-native-async-storage/async-storage/lib/typescript/types';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Roulette arrays
export const shotArray: string[] = [
  'Backhand',
  'Forehand',
];
export const shapeArray: string[] = [
  'Hyzer',
  'Anhyzer',
  'Roller',
  'Flat',
  'Any shape'
];
export const discArray: string[] = [
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

// Storage and player interfaces
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
export interface Player {
  name: string,
  score: number,
  id: number,
  scoreToAdd: string
}

// Storage functions
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
    await AsyncStorage.setItem(`${value.date}`, jsonValue);
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

export const removeRound = async (key: string) => {

  try {
    await AsyncStorage.removeItem(`${key}`)
    console.log('Round removed.')
  } catch(error) {
    console.log(error)
  }
}

export const removeCourse = async (key: string) => {

  try {
    await AsyncStorage.removeItem(`${key}`)
  } catch(error) {
    console.log(error)
  }
  console.log('Course removed.')
}

export const clearAll = async () => {
  
  try {
    await AsyncStorage.clear();
  } catch(error) {
    console.log(error);
  }
  console.log('Cleared all AsyncStorage data');
}