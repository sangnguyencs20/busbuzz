import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

//Our beloved RNP, of course!
import { Provider as PaperProvider } from 'react-native-paper';

// For navigation purpose
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Onboarding screens
import TicketBooking from './screens/Onboarding/TicketBooking';
import Security from './screens/Onboarding/Security';
import Service from './screens/Onboarding/Service';

// Authentication screens
import SignUpScreen from './screens/Signup';
import LoginScreen from './screens/Login';

//App screens
import HomeScreen from './screens/Home';

const clearAsyncStorage = async () => {
  try {
    await AsyncStorage.clear();
    console.log('AsyncStorage cleared successfully.');
  } catch (error) {
    console.log('Failed to clear AsyncStorage.', error);
  }
};

function App() {
  // clearAsyncStorage();
  const Stack = createNativeStackNavigator();

  const [isFirstLaunch, setIsFirstLaunch] = useState(null);

  // Check if the app is launched for the first time
  useEffect(() => {
    AsyncStorage.getItem('alreadyLaunched').then((value) => {
      if (value === null) {
        AsyncStorage.setItem('alreadyLaunched', 'true');
        setIsFirstLaunch(true);
      } else {
        setIsFirstLaunch(false);
      }
    });
  }, []);

  if (isFirstLaunch === null) {
    return null; // Show nothing while determining the first launch
  } else if (isFirstLaunch === true) {
    return (
      <PaperProvider>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
              animationEnabled: true,
            }}
            initialRouteName='TicketBooking'
          >
            <Stack.Group>
              <Stack.Screen name="TicketBooking" component={TicketBooking} />
              <Stack.Screen name="Security" component={Security} />
              <Stack.Screen name="Service" component={Service} />
            </Stack.Group>

            <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    );
  } else {
    return (
      <PaperProvider>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
              animationEnabled: true,
            }}
            initialRouteName='LoginScreen'
          >
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    );
  }
};

export default App;