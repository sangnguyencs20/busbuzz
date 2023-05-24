import React, {useState, useEffect} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, StyleSheet } from "react-native";
import { Card, Button, Text, IconButton, Avatar } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialIcons";
import { SafeAreaView } from "react-native-safe-area-context";
import { API_URL } from "@env";
import axios from "axios";
// import {Navigation}

const Payment = ({ navigation }) => {
  const [busNum, setBusNum] = useState('');
  const [depart, setDepart] = useState('');
  const [arrive, setArrive] = useState('');
  const [time, setTime] = useState('');
  const [price, setPrice] = useState('');
  const [date, setDate] = useState('');
  const [user, setUser] = useState('');

  useEffect(() => {
    //Lấy thông tin truyền từ SearchResult
    const getBusData = async () => {
      try {
        const data = await AsyncStorage.getItem('busData');
        if (data !== null) {
          const { busNum, depart, arrive, time, price } = JSON.parse(data);
          setBusNum(busNum);
          setDepart(depart);
          setArrive(arrive);
          setTime(time);
          setPrice(price);
        }
      } catch (error) {
        console.log('Error retrieving data: ', error);
      }
    };

    //Lấy thông tin user, cụ thể là trường fullName
    const fetchUser = async () => {
      try {
      //T đang k biết làm sao để lấy được id của user đang đăng nhập
      const userId = "645b4f0d37926b086cd5b1b5"; // T đang set cứng cho acc của svn á
      const response = await axios.get(`${API_URL}/users/:${userId}`);
      const user = await response.json();
      setUser(user);
      } catch (error) {
        console.log('Error retrieving user full name: ', error);
      }
    };

    getBusData();
    fetchUser();
  }, []);

  //set current day to be the day of departure
  setDate(new Date());

  return (
    <SafeAreaView style={styles.container}>
      <IconButton style={styles.goBack} icon="arrow-left" size={30} />

      <View style={styles.topCircle}>
        <Avatar.Icon icon="ticket" size={80} />
      </View>
      <Card mode="contained" style={styles.cardContainer}>
        <Card.Content>
          <View style={styles.upperSection}>
            <Text variant="headlineSmall">Hành khách</Text>
            {user && (
            <Text variant="headlineSmall" style={{ fontWeight: 700 }}>
              {user.fullName}
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
                <Text variant="titleMedium">{date}</Text>
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
                style={{ alignSelf: "center", marginTop: 15, marginBottom: 5 }}
              />
              <View style={styles.busInfo}>
                <Text variant="titleLarge" style={{ fontWeight: 700 }}>
                  {busNum}
                </Text>
                <Text
                  variant="bodyMedium"
                  style={{ textAlign: "center", margin: 5 }}
                >
                  `${depart} - ${arrive}`
                </Text>
                <Button mode="contained" style={{ marginVertical: 15 }}>
                  `${price} đ`
                </Button>
              </View>
            </Card>
          </View>
        </Card.Content>
      </Card>
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
            // saveTicketData(busNum, depart, arrive, time, price, date);
            addTicket(busNum, date, time, depart, arrive);
            navigation.navigate("PaymentSuccess")
          }}
        >
          Thanh toán
        </Button>
      </View>
    </SafeAreaView>
  );
};

const addTicket = async (busNum, date, time, startStop, endStop) => {
  const ticket = {
    routeId: busNum, //???? :)))))
    day: date, 
    time: time, 
    startStop: startStop, 
    endStop: endStop, 
  };

  try {
    const response = await axios.post(`${API_URL}/tickets`, ticket);
    if (response.status === 200) {
      const TicketInfo = response.data;
      setBusInfo(TicketInfo); //Log thông tin ticket mới thêm vào
    } else {
      console.log("Response status:", response.status);
    }

  } catch (error) {
    console.error(error);
  }
};

//Save bus data for further use
// const saveTicketData = async (busNum, depart, arrive, time, price, date) => {
//   try {
//     const data = { busNum, depart, arrive, time, price, date };
//     await AsyncStorage.setItem("ticketData", JSON.stringify(data));
//     console.log("Bus ticket saved successfully");
//   } catch (error) {
//     console.log("Error saving bus ticket: ", error);
//   }
// };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  goBack: {
    position: "absolute",
    top: 30,
    left: 10,
  },
  topCircle: {
    position: "absolute",
    top: 80,
    zIndex: 1,
  },
  cardContainer: {
    width: "85%",
    borderRadius: 25,
    marginVertical: 25,
    position: "absolute",
    top: 95,
    paddingTop: 50,
  },
  upperSection: {
    alignItems: "center",
    paddingTop: 60,
  },
  line: {
    // width: "100%",
    // height: 1,
    // marginVertical: 10,
    // color: "black",
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
    position: "absolute",
    bottom: 10,
  },
  paymentMethod: {
    paddingHorizontal: 40,
    marginVertical: 10,
  },
  payment: {
    marginVertical: 10,
    marginHorizontal: 0,
  },
});

export default Payment;
