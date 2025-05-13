import React, {useState} from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Alert,
} from 'react-native';
import {authenticate} from '../services/api';
import {useNavigation} from '@react-navigation/native';

const TokenScreen = () => {
  const [token, setToken] = useState('');
  const navigation = useNavigation();

  const handleSubmit = async () => {
    try {
      if (!token.trim()) {
        Alert.alert('Error', 'Please enter a token');
        return;
      }

      await authenticate(token);
      navigation.navigate('Posts');
    } catch (error) {
      Alert.alert('Error', 'Invalid token or authentication failed');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={token}
        onChangeText={setToken}
        placeholder="Enter your token"
        placeholderTextColor="#666"
        autoCapitalize="none"
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 20,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#007AFF',
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default TokenScreen;
