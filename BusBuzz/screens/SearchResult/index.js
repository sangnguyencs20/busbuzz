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
import BusCard from "../../components/BusCard";
import AppbarComponent from "../../components/Appbar";

const SeachResultScreen = ({ navigation }) => {
  const [BusInfo, setBusInfo] = useState([]);

  // retrive search data from redux
  const idDeparture = useSelector((state) => state.search.departure._id);
  const idDestination = useSelector((state) => state.search.destination._id);

  const nameDeparture = useSelector((state) => state.search.departure.name);
  const nameDestination = useSelector((state) => state.search.destination.name);

  // For testing without Search data
  // const idDeparture = "64699f8fa39bcf193c8be630";
  // const idDestination = "64699f8fa39bcf193c8be635";
  // const nameDeparture = "Đại học Bách Khoa";
  // const nameDestination = "Trung tâm Thương mại Aeon Mall Tân Phú";

  const searchData = {
    start: idDeparture,
    end: idDestination,
  };

  useEffect(() => {
    async function fetchBusInfo() {
      const searchUrl = `${API_URL}/routes/search`;
      try {
        const accessToken = await AsyncStorage.getItem("accessToken");
        const response = await axios.post(searchUrl, searchData, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        });
        if (response.status === 200) {
          const BusInfo = response.data;
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
      <AppbarComponent navigation={navigation}/>
      <View style={styles.container}>
        {BusInfo.map(({ _id, price, timeline, bus }, index) => (
          <TouchableRipple
            key={_id}
            onPress={() =>
              savebusData(
                //Save bus data upon click
                bus.number,
                nameDeparture,
                nameDestination,
                getNearestTimeline(timeline),
                `${price}đ`
              )
            }
          >
            <BusCard
              busNum={bus.number}
              depart={nameDeparture}
              arrive={nameDestination}
              time={timeline[0]}
              price={`${price}đ`}
            />
          </TouchableRipple>
        ))}
      </View>
    </ScrollView>
  );
};

//helper function to get nearest time from timeline
const getNearestTimeline = (timeline) => {
  const now = Date.now();
  let nearest = timeline[0];
  let minDiff = Math.abs(now - new Date(nearest).getTime());
  for (let i = 1; i < timeline.length; i++) {
    const diff = Math.abs(now - new Date(timeline[i]).getTime());
    if (diff < minDiff) {
      nearest = timeline[i];
      minDiff = diff;
    }
  }
  return nearest;
};

//Save bus data for further use
const savebusData = async (busNum, depart, arrive, time, price) => {
  try {
    const data = { busNum, depart, arrive, time, price };
    await AsyncStorage.setItem("busData", JSON.stringify(data));
    console.log("Data saved successfully");
  } catch (error) {
    console.log("Error saving data: ", error);
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    justifyContent: "center",
  },
});

export default SeachResultScreen;
