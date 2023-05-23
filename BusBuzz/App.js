import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Provider } from 'react-redux';
import store from './store';

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
import SeachResultScreen from './screens/SearchResult';

import Payment from './screens/Payment/Payment';
import PaymentChoice from './screens/Payment/PaymentChoice';
import PaymentSuccess from './screens/Payment/PaymentSuccess';

const clearAsyncStorage = async () => {
  try {
    await AsyncStorage.clear();
    console.log('AsyncStorage cleared successfully.');
  } catch (error) {
    console.log('Failed to clear AsyncStorage.', error);
  }
};

function App() {
  clearAsyncStorage();
  const Stack = createNativeStackNavigator();

  const [isFirstLaunch, setIsFirstLaunch] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem('accessToken').then((token) => {
      if (token) {
        setIsLoggedIn(true); // Set login status to true if access token exists
      }
      AsyncStorage.getItem('alreadyLaunched').then((value) => {
        if (value === null) {
          AsyncStorage.setItem('alreadyLaunched', 'true');
          setIsFirstLaunch(true);
        } else {
          setIsFirstLaunch(false);
        }
      });
    });
  }, []);

  return (
    isFirstLaunch !== null && (
      <Provider store={store}>
        <PaperProvider theme={LightTheme}>
          <NavigationContainer theme={LightTheme}>
            <Stack.Navigator
              screenOptions={{
                headerShown: false,
                animationEnabled: true,
                disableGestures: true,
              }}
              
              initialRouteName={isFirstLaunch ? 'OnboardingScreen' : isLoggedIn ? 'HomeScreen' : 'LoginScreen'}
            >
              {isFirstLaunch && (
                <Stack.Screen name="OnboardingScreen" component={OnboardingScreen} />
              )}

              <Stack.Screen name="LoginScreen" component={LoginScreen} />
              <Stack.Screen name="SignUpScreen" component={SignUpScreen} />

              <Stack.Screen name="HomeScreen" component={HomeScreen} />
              <Stack.Screen name="SearchScreen" component={SearchScreen} />
              <Stack.Screen name="SearchResultScreen" component={SeachResultScreen} />

              <Stack.Screen name="Payment" component={Payment} />
              <Stack.Screen name="PaymentChoice" component={PaymentChoice} />
              <Stack.Screen name="PaymentSuccess" component={PaymentSuccess} />
            </Stack.Navigator>
          </NavigationContainer>
        </PaperProvider>
      </Provider>
    )
  );
};

export default App;