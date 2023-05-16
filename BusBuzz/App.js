import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

//Our beloved RNP, of course!
import { Provider as PaperProvider } from 'react-native-paper';

// For navigation purpose
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//For theme
import LightTheme from './assets/theme/LightTheme';
import DarkTheme from './assets/theme/DarkTheme';

// Onboarding screens
import OnboardingScreen from './screens/Onboarding/Onboarding';

// Authentication screens
import SignUpScreen from './screens/Signup';
import LoginScreen from './screens/Login';

//App screens
import HomeScreen from './screens/Home';
import SearchScreen from './screens/SearchScreen';

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

  return (
    isFirstLaunch !== null && (
      <PaperProvider theme={LightTheme}>
        <NavigationContainer theme={LightTheme}>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
              animationEnabled: true,
            }}
            initialRouteName={isFirstLaunch ? "OnboardingScreen" : "LoginScreen"}
          >
            {isFirstLaunch && (
              <Stack.Screen name="OnboardingScreen" component={OnboardingScreen} />
            )}

            <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
            <Stack.Screen name="HomeScreen" component={HomeScreen} />

            {isFirstLaunch && (
              <Stack.Screen name="SearchScreen" component={SearchScreen} />
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    )
  );
};

export default App;