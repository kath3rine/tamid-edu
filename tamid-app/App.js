import { StyleSheet, Text, View, TextInput, Image } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Katherine's App</Text>
      <View>
        <TextInput style={styles.textin} placeholder='first input here' />
      </View>
      <Image source={require('./assets/dog.png')} style={styles.picture} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  title: {
    backgroundColor: '#55ff55',
    borderColor: 'black',
    borderWidth: 5,
    margin: 20,
    padding: 20,
    fontWeight: 'bold',
    fontSize: 30,
  },

  textin: {
    backgroundColor: '#aaaaff',
    borderColor: 'black',
    borderWidth: 2,
    margin: 10,
    padding: 10,
  },

  picture: {
    resizeMode: 'center',
    height: 200,
    width: 200,
  }
});
