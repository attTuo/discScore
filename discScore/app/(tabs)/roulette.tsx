import { Pressable, StyleSheet } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Text, View } from '@/components/Themed';

export default function TabRouletteScreen() {



  return (
    <View style={styles.container}>

      <Text style={styles.title}>Roulette</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />

      <View style={styles.rouletteContent}>

        <FontAwesome style={styles.icon} name='dashboard'/>

        <Text style={styles.title}>Throw</Text>

        <Text style={styles.text}>Shot variable - Shape variable</Text>

        <Text style={styles.title}>With</Text>

        <Text style={styles.text}>Disc variable</Text>

        <Pressable style={styles.rollButton}>

          <View style={styles.buttonContent}>

            <Text style={styles.buttonText}>Roll</Text>
            <FontAwesome style={styles.smallIcon} name='refresh'/>

          </View>

        </Pressable>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 100
  },
  title: {
    fontSize: 35,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  rouletteContent: {
    flex: 1,
    alignItems: 'center'
  },
  text: {
    fontSize: 25,
    fontStyle: 'italic'
  },
  icon: {
    fontSize: 100,
    marginBottom: 50
  },
  rollButton: {
    height: 75,
    width: 300,
    borderWidth: 2,
    borderColor: 'black',
    marginTop: 50,
    justifyContent: 'center'
  },
  buttonContent: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: 'lightblue'
  },
  buttonText:{
    fontSize: 25,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  smallIcon: {
    fontSize: 30,
    alignSelf: 'center',
    marginLeft: 10
  }
});
