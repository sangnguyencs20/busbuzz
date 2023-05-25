import React, { useState } from "react";
import { View, StyleSheet, Switch } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { List, Divider, Button, useTheme, Appbar } from "react-native-paper";

import { useDispatch } from "react-redux";
import AppbarComponent from "../../components/Appbar";
import {
  clearDeparture,
  clearDestination,
} from "../../reducers/searchReducer";

const SettingsScreen = ({ navigation, isDarkMode, setIsDarkMode }) => {
  const dispatch = useDispatch();
  const { colors } = useTheme();

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
    setBackgroundColor(isDarkMode ? colors.surface : colors.background);
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <AppbarComponent navigation={navigation} />
      <List.Section>
        <List.Subheader>Settings</List.Subheader>
        <List.Item
          title="Dark Mode"
          left={(props) => <List.Icon {...props} icon="weather-night" />}
          right={() => (
            <Switch value={isDarkMode} onValueChange={toggleDarkMode} />
          )}
        />
      </List.Section>
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
