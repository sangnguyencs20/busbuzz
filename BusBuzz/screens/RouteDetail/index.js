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

import { API_URL } from "@env";
import AppbarComponent from "../../components/Appbar";
import BusCard from "../../components/BusCard";
import BusStopList from "../../components/BusStopCard";

const RouteDetailScreen = ({ navigation }) => {
  const [busData, setBusData] = useState({});
  const [busStopList, setbusStopList] = useState({});

  useEffect(() => {
    async function fetchData() {
      const data = await getData();
      const busStopListdata = await getPlacesFromStorage();
      setBusData(data);
      if (busStopListdata !== null) {
        setbusStopList(busStopListdata);
      }
    }
    fetchData();
  }, []);

  const getData = async () => {
    try {
      const data = await AsyncStorage.getItem("busData");
      if (data !== null) {
        const { busNum, depart, arrive, time, price } = JSON.parse(data);
        return { busNum, depart, arrive, time, price };
      }
    } catch (error) {
      console.log("Error retrieving data: ", error);
    }
  };

  const getPlacesFromStorage = async () => {
    try {
      const places = await AsyncStorage.getItem("selectedBusPlaces");
      if (places !== null) {
        return JSON.parse(places);
      }
    } catch (error) {
      console.log("Error getting places from AsyncStorage: ", error);
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <AppbarComponent navigation={navigation} />
        <BusCard
          busNum={busData.busNum}
          depart={busData.depart}
          arrive={busData.arrive}
          time={busData.time}
          price={busData.price}
        />
        <BusStopList busStopList={busStopList} />

        {/* need navigation handler */}
        <Button style={styles.btn} mode="contained" onPress={() => navigation.navigate("Payment")}>
          Đặt vé
        </Button>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  errorContainer: {
    flex: 1,
    margin: 20,
    justifyContent: "center",
  },
  img: {
    marginBottom: 20,
    alignSelf: "center",
    height: 300,
    width: "100%",
  },
  errorText: {
    alignSelf: "flex-start",
    marginBottom: 15,
  },
  btn: {
    margin: 20,
  },
});

export default RouteDetailScreen;
