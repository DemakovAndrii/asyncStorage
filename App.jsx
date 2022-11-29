import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const App = () => {
  const [key, setKey] = useState('');
  const [value, setValue] = useState('');
  const [res, setRes] = useState('');
  const [query, setQuery] = useState('');

  const setData = async () => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (e) {
      console.error(e);
    }
  };

  const getData = async () => {
    if (query === key) {
      try {
        const value = await AsyncStorage.getItem(key);
        setRes(value);
      } catch (e) {
        console.error(e);
      }
    } else {
      setRes('error');
    }
  };

  return (
    <SafeAreaView
      style={{
        backgroundColor: 'white',
        height: '100%',
        justifyContent: 'center',
        padding: 10,
      }}>
      <ScrollView>
        <Text style={styles.text}>Save a key/value</Text>
        <TextInput
          style={styles.textInput}
          placeholder={'Enter a key'}
          placeholderTextColor={'gray'}
          onChangeText={setKey}
        />
        <TextInput
          style={styles.textInput}
          placeholder={'Enter a value'}
          placeholderTextColor={'gray'}
          onChangeText={setValue}
        />
        <View style={{paddingBottom: 40}}>
          <Button onPress={setData} title="save" />
        </View>
        <Text style={styles.text}>Enter your key:</Text>
        <TextInput
          style={styles.textInput}
          placeholder={'Enter a key'}
          placeholderTextColor={'gray'}
          onChangeText={setQuery}
        />
        <Button onPress={getData} title="get value" />
        <Text style={styles.text}>{res ?? ''}</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 22,
    textAlign: 'center',
    fontWeight: '700',
    color: 'black',
    paddingBottom: 5,
  },
  textInput: {
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
    fontSize: 18,
    color: 'black',
    marginBottom: 5,
  },
});
export default App;
