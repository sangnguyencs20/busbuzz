import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { Card, Title, Paragraph, Text } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { API_URL } from "@env";

const TicketCard = ({ routeId, startStopId, endStopId, time, price, status }) => {
  const [busNum, setBusNum] = useState("");
  const [startStop, setStartStop] = useState("");
  const [endStop, setEndStop] = useState("");
  
  useEffect(() => {
    async function getRouteByRouteId() {
      const searchUrl = `${API_URL}/routes/${routeId}`;
      try {
        const accessToken = await AsyncStorage.getItem("accessToken");
        const response = await axios.get(searchUrl, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (response.status === 200) {
          const data = response.data;
          setBusNum(data.bus.number);
        } else {
          console.log("Response status:", response.status);
        }
      } catch (error) {
        console.error(error);
      }
    }
    getRouteByRouteId();

    async function getStartStopByStopId() {
      const searchUrl = `${API_URL}/busStops/${startStopId}`;
      try {
        const accessToken = await AsyncStorage.getItem("accessToken");
        const response = await axios.get(searchUrl, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (response.status === 200) {
          const data = response.data;
          setStartStop(data.name);
        } else {
          console.log("Response status:", response.status);
        }
      } catch (error) {
        console.error(error);
      }
    }
    getStartStopByStopId();

    async function getEndStopByStopId() {
      const searchUrl = `${API_URL}/busStops/${endStopId}`;
      try {
        const accessToken = await AsyncStorage.getItem("accessToken");
        const response = await axios.get(searchUrl, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (response.status === 200) {
          const data = response.data;
          setEndStop(data.name);
        } else {
          console.log("Response status:", response.status);
        }
      } catch (error) {
        console.error(error);
      }
    }
    getEndStopByStopId();
  }, []);

  //helper funtion for date & time formatting
  const dateString = time;
  const dateObj = new Date(dateString);
  const hours = dateObj.getUTCHours();
  const minutes = dateObj.getUTCMinutes();
  const timeString = `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}`;
  const day = dateObj.getUTCDate();
  const month = dateObj.getUTCMonth() + 1;
  const year = dateObj.getUTCFullYear();
  const dateStringFormatted = `${day.toString().padStart(2, "0")}/${month
    .toString()
    .padStart(2, "0")}/${year}`;

  return (
    <Card mode={status ? "outline" : "contained"} style={styles.card}>
      <View style={styles.row}>
        <View style={[styles.column, styles.leftColumn]}>
          <View style={styles.icon}>
            <Icon name="ticket-confirmation-outline" size={35} />
          </View>
        </View>
        <View style={styles.divider} />
        <View style={[styles.column, styles.rightColumn]}>
          <Card.Content>
            <Title style={styles.title}>Tuyến số {busNum}</Title>
            <Paragraph style={styles.paragraph}>
              {startStop} - {endStop}
            </Paragraph>
            <View style={styles.divPara}>
              <Text style={styles.price}>
                {status ? dateStringFormatted : timeString}
              </Text>
              <Text style={styles.price}>{`${price}đ`}</Text>
            </View>
          </Card.Content>
        </View>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 16,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  row: {
    flexDirection: "row",
  },
  column: {
    paddingHorizontal: 8,
  },
  leftColumn: {
    flex: 0.25,
    justifyContent: "center",
    alignItems: "center",
  },
  rightColumn: {
    padding: 10,
    flex: 0.75,
  },
  divider: {
    width: 1,
    backgroundColor: "#ccc",
  },
  title: {
    alignSelf: "flex-end",
    fontWeight: "bold",
  },
  paragraph: {
    alignSelf: "flex-start",
    fontSize: 15,
    paddingTop: 5,
  },
  price: {
    alignSelf: "flex-start",
    fontSize: 15,
    paddingTop: 5,
    fontWeight: "bold",
  },
  divPara: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  icon: {},
});

export default TicketCard;
