import AsyncStorage from '@react-native-async-storage/async-storage';

export interface RoundScore {
	name: string,
	score: number
}

export const storeData = async (value: RoundScore) => {
    try {
    	const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('round-key', jsonValue);
			console.log('Item added')

    } catch (error) {
      console.log(error)
    }
  };

export const getData = async () => {
    try {
			const jsonValue = await AsyncStorage.getItem('round-key');
			return jsonValue != null ? JSON.parse(jsonValue) : null;

    } catch (error) {
      console.log(error)
    }
};

export const getAllData = async () => {

	try {
		const keys = await AsyncStorage.getAllKeys();
		const result = await AsyncStorage.multiGet(keys);
		return result.toString;

	} catch (error) {
		console.error(error)
	}
}

export const removeItem = async () => {

  try {
    await AsyncStorage.removeItem('round-key')
  } catch(error) {
    console.log(error)
  }

  console.log('Item removed.')
}

export const clearAll = async () => {
  try {
    await AsyncStorage.clear()
  } catch(error) {
    console.log(error)
  }

  console.log('Cleared all AsyncStorage data')
}