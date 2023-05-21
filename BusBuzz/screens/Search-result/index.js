import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import {
  TextInput,
  Button,
  Text,
  TouchableRipple,
  Snackbar,
} from "react-native-paper";

import BusCard from "../../components/BusInfoCard";

const SeachResultScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* <BusCard />
      <BusCard />
      <BusCard />
      <BusCard /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
});

export default SeachResultScreen;
