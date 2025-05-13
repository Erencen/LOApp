import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TokenScreen from './src/pages/Tokenpage';
import PostsScreen from './src/pages/Postspage';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Token">
        <Stack.Screen
          name="Token"
          component={TokenScreen}
          options={{
            title: 'Enter Token',
          }}
        />
        <Stack.Screen
          name="Posts"
          component={PostsScreen}
          options={{
            title: 'Feed',
            headerBackVisible: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
