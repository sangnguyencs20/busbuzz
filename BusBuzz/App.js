import React from 'react';
import { View, SafeAreaView } from 'react-native';
import { Provider as PaperProvider, Button } from 'react-native-paper';

const App = () => {
  return (
    <PaperProvider>
      <SafeAreaView>
        <Button elevation={5} mode="contained" onPress={() => console.log('Pressed')}> Press me </Button>
      </SafeAreaView>
    </PaperProvider>
  );
};

export default App;