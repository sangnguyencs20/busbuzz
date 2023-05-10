import React from 'react';
import { View, SafeAreaView } from 'react-native';
import { Provider as PaperProvider, Button } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Login from './screens/Login';

const App = () => {
  return (
    <PaperProvider>
      <SafeAreaView>
        {/* <Button elevation={5} mode="contained" onPress={() => console.log('Pressed')}> Press me </Button> */}
        <Login/>
      </SafeAreaView>
    </PaperProvider>
  );
};

export default App;