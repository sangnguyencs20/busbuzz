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
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";

import BusCard from "../../components/BusCard";

const SeachResultScreen = ({ navigation }) => {
  const [BusInfo, setBusInfo] = useState([]);
  const idDeparture = useSelector((state) => state.search.departure.id);
  const idDestination = useSelector((state) => state.search.destination.id);

  console.log(idDeparture, idDestination);

  const searchData = {
    start: idDeparture,
    end: idDestination,
  };

  // Hard code for testing
  // const searchData = {
  //   start: "64607f81128f9cff725040fd",
  //   end: "64608317128f9cff725040fe",
  // };

  useEffect(() => {
    async function fetchBusInfo() {
      try {
        const accessToken = await AsyncStorage.getItem("accessToken");
        const response = await axios.post(
          "http://192.168.1.15:3000/routes/search",
          searchData,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        if (response.status === 200) {
          const BusInfo = response.data;
          console.log(response.data);
          setBusInfo(BusInfo);
        } else {
          console.log("Response status:", response.status);
        }
      } catch (error) {
        console.error(error);
      }
    }
    fetchBusInfo();
  }, []);

  return (
    <ScrollView>
      <View style={styles.container}>
        {BusInfo.map(({ _id, price, timeline }, index) =>
          timeline.map((time, timeIndex) => (
            <BusCard
              key={`${_id}_${timeIndex}`}
              busID={_id}
              depart={idDeparture}
              arrive={idDestination}
              time={time}
              price={`${price} đ`}
            />
          ))
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    justifyContent: "center",
  },
});

export default SeachResultScreen;
