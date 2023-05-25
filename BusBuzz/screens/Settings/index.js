import React, { useState } from "react";
import { View, StyleSheet, Switch } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { List, Divider, Button, useTheme, Appbar } from "react-native-paper";

import { useDispatch } from "react-redux";
import AppbarComponent from "../../components/Appbar";
import { clearDeparture, clearDestination } from "../../reducers/searchReducer";

import DarkTheme from "../../assets/theme/DarkTheme";
import LightTheme from "../../assets/theme/LightTheme";

const SettingsScreen = ({ navigation, isDarkMode, setIsDarkMode }) => {
  const dispatch = useDispatch();

  // Xác định theme hiện tại dựa trên giá trị isDarkMode
  const theme = isDarkMode ? DarkTheme : LightTheme;

  async function deleteToken() {
    try {
      if (tokens.accessToken) {
        await AsyncStorage.removeItem("accessToken");
      }
    } catch (e) {
      console.log(e);
    }
  }

  const handleLogout = () => {
    deleteToken();
    dispatch(clearDeparture());
    dispatch(clearDestination());
    navigation.navigate("LoginScreen");
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <AppbarComponent navigation={navigation} />
      
      <Divider />
      <Button mode="contained" onPress={handleLogout}>
        Logout
      </Button>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});

export default SettingsScreen;
