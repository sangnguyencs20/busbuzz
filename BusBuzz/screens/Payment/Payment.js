import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, StyleSheet } from "react-native";
import { Card, Button, Text, IconButton, Avatar } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialIcons";
import { SafeAreaView } from "react-native-safe-area-context";
import { API_URL } from "@env";
import axios from "axios";
import AppbarComponent from "../../components/Appbar";

const Payment = ({ navigation }) => {
  const [routeId, setRouteId] = useState("");
  const [busNum, setBusNum] = useState("");
  const [depart, setDepart] = useState("");
  const [arrive, setArrive] = useState("");
  const [time, setTime] = useState("");
  const [price, setPrice] = useState("");
  const [date, setDate] = useState("");
  const [fullName, setFullName] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [userId, setUserId] = useState("");
  const [departId, setDepartId] = useState("");
  const [arriveId, setArriveId] = useState("");

  //Lấy thông tin truyền từ SearchResult
  const getBusData = async () => {
    try {
      const data = await AsyncStorage.getItem("busData");
      if (data !== null) {
        const {routeId, busNum, depart, arrive, time, price } = JSON.parse(data);
        setRouteId(routeId);
        setBusNum(busNum);
        setDepart(depart);
        setArrive(arrive);
        setTime(time);
        setPrice(price);
      }
    } catch (error) {
      console.log("Error retrieving data: ", error);
    }
  };

  //Lấy thông tin user, cụ thể là trường fullName
  const fetchUser = async () => {
    try {
      const fullName = await AsyncStorage.getItem("fullName");
      const dataUserId = await AsyncStorage.getItem("userID");
      setUserId(dataUserId);

      if (fullName !== null) {
        setFullName(fullName);
      }
    } catch (error) {
      console.log("Error retrieving fullName: ", error);
    }
  };

  const fetchStopFromRouteID = async () => {
    try {
      const response = await axios.get(`${API_URL}/routes/${routeId}`);
      if (response.status === 200) {
        const route = response.data;
        console.log("Route: ", route);
      } else {
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  };


  useEffect(() => {
    getBusData();
    fetchUser();
    fetchStopFromRouteID();
  }, []);

  useEffect(() => {
    function getToday() {
      const today = new Date();
      setDate(today.toISOString());
      const day = today.getDate().toString().padStart(2, "0");
      const month = (today.getMonth() + 1).toString().padStart(2, "0");
      const year = today.getFullYear();
      return `${day}/${month}/${year}`;
    }
    
    setDepartureDate(getToday());
  }, []);

  const addTicket = async (routeId, today, startStop, endStop, price, status, userId) => {
    const ticket = {
      routeId: routeId,
      day: today,
      startStop: startStop,
      endStop: endStop,
      price: price,
      status: status,
      userId: userId,
    };
    console.log("Ticket: ", ticket);
    try {
      const response = await axios.post(`${API_URL}/tickets`, ticket);
      if (response.status === 200) {
        const TicketInfo = response.data;
        setBusInfo(TicketInfo); // Log thông tin ticket mới thêm vào
      } else {
        console.log("Response status:", response.status);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <AppbarComponent navigation={navigation} />
      <View style={styles.Circlecontainer}>
        <View style={styles.topCircle}>
          <Avatar.Icon icon="ticket" size={80} />
        </View>
        <Card mode="contained" style={styles.cardContainer}>
          <Card.Content>
            <View style={styles.upperSection}>
              <Text variant="bodyLarge">Hành khách</Text>
              {fullName ? (
                <Text variant="headlineSmall" style={{ fontWeight: 700 }}>
                  {fullName}
                </Text>
              ) : (
                <Text variant="headlineSmall" style={{ fontWeight: 700 }}>
                  Lỗi lấy tên hành khách
                </Text>
              )}
              {/* passenger */}
            </View>

            <View style={styles.line} />
            <View style={styles.lowerSection}>
              <View style={styles.date}>
                <Avatar.Icon
                  icon="calendar"
                  size={50}
                  color="white"
                  style={{ alignSelf: "center" }}
                />
                <View style={styles.dateTime}>
                  <Text variant="titleMedium">Ngày</Text>
                  <Text variant="titleMedium">{departureDate}</Text>
                </View>
                <View style={styles.dateTime}>
                  <Text variant="titleMedium">Giờ xuất phát</Text>
                  <Text variant="titleMedium">{time}</Text>
                </View>
              </View>
              <Card mode="contained">
                <Avatar.Icon
                  icon="bus"
                  size={50}
                  style={{
                    alignSelf: "center",
                    marginTop: 15,
                    marginBottom: 5,
                  }}
                />
                <View style={styles.busInfo}>
                  <Text variant="titleLarge" style={{ fontWeight: 700 }}>
                    {busNum}
                  </Text>
                  <Text
                    variant="bodyMedium"
                    style={{ textAlign: "center", margin: 5 }}
                  >
                    {depart} - {arrive}
                  </Text>
                  <Button
                    mode="contained"
                    style={{ marginVertical: 15, width: "60%" }}
                  >
                    {price}
                  </Button>
                </View>
              </Card>
            </View>
          </Card.Content>
        </Card>
      </View>
      <View style={styles.buttons}>
        <Button
          mode="contained"
          style={styles.paymentMethod}
          icon="wallet"
          onPress={() => navigation.navigate("PaymentChoice")}
        >
          Chọn phương thức thanh toán
        </Button>
        <Button
          mode="contained"
          style={styles.payment}
          onPress={() => {
            addTicket(routeId, date, depart, arrive, price, false, userId);
            navigation.navigate("PaymentSuccess");
          }}
        >
          Thanh toán
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  Circlecontainer: {
    flex: 1,
    alignItems: "center",
  },
  topCircle: {
    zIndex: 1,
  },
  cardContainer: {
    width: "85%",
    borderRadius: 25,
    position: "absolute",
    top: 35,
  },
  upperSection: {
    alignItems: "center",
    paddingTop: 35,
  },
  line: {
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    height: 1,
    borderStyle: "dashed",
    marginVertical: 20,
    width: "85%",
    alignSelf: "center",
  },
  lowerSection: {
    paddingHorizontal: 40,
  },
  dateTime: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 5,
  },
  busInfo: {
    alignItems: "center",
  },
  buttons: {
    width: "100%",
    alignItems: "center",
  },
  paymentMethod: {
    width: "85%",
    marginBottom: 15,
  },
  payment: {
    width: "85%",
    marginBottom: 10,
  },
});

export default Payment;
