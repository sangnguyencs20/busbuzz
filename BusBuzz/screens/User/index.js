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
import UserCard from "../../components/UserCard";
import TicketCard from "../../components/TicketCard";

const UserScreen = ({ navigation }) => {
  const [ticketsList, setTicketsList] = useState([]);

  useEffect(() => {
    async function getTicketsByUserId() {
      const searchUrl = `${API_URL}/tickets/getTicketsByUserId`;
      try {
        const accessToken = await AsyncStorage.getItem("accessToken");
        const userId = await AsyncStorage.getItem("userID");
        console.log("User ID:", userId);
        const API_body = {
          userId: userId,
        };
        const response = await axios.post(searchUrl, API_body, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        });
        if (response.status === 200) {
          const data = response.data;
          data.reverse();
          setTicketsList(data);
        } else {
          console.log("Response status:", response.status);
        }
      } catch (error) {
        console.error(error);
      }
    }
    getTicketsByUserId();
  }, []);

  console.log("Tickets list:", ticketsList.reverse());

  return (
    <ScrollView>
      <View style={styles.container}>
        <AppbarComponent navigation={navigation} />
        <UserCard navigation={navigation} />
        <Button
          style={styles.btn}
          mode="contained"
          onPress={() => setTicketsList(ticketsList.slice().reverse())}
        >
          Sắp xếp
        </Button>
        {ticketsList
          .reverse()
          .map(({ _id, routeId, day, startStop, endStop, price, status }) => (
            <TicketCard
              key={_id}
              routeId={routeId}
              startStopId={startStop}
              endStopId={endStop}
              time={day}
              price={price}
              status={status}
            />
          ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },

  btn: {
    marginHorizontal: 20,
  },
});

export default UserScreen;
