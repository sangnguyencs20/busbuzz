import React from "react";
import { View, StyleSheet } from "react-native";
import { Card, Button, Text, IconButton, Avatar } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialIcons";
import { SafeAreaView } from "react-native-safe-area-context";
// import {Navigation}

const Payment = ({
  passenger,
  day,
  month,
  year,
  departHour,
  departMin,
  busNumber,
  busLine,
  price,
  navigation,
}) => {


  return (
    <SafeAreaView style={styles.container}>
      <IconButton mode="outlined" style={styles.goBack} icon='arrow-left' size={30} />
      <View style={styles.topCircle}>
        <Avatar.Icon icon="ticket" size={80} />
      </View>
      <Card mode="outlined" style={styles.cardContainer}>
        <View style={styles.upperSection}>
          <Text style={styles.upperText1}>Quý khách</Text>
          <Text style={styles.upperText2}>ABC</Text>
          {/* passenger */}
        </View>
        <View style={styles.line} />
        <View style={styles.lowerSection}>
          <View style={styles.date}>
            <Avatar.Icon
              icon="calendar"
              size={40}
              color="white"
              style={{ alignSelf: "center" }}
            />
            <View style={styles.dateText}>
              <Text style={styles.dateLabel}>Ngày</Text>
              <Text style={styles.dateValue}>20/5/2022</Text>
            </View>
            <View style={styles.timeText}>
              <Text style={styles.timeLabel}>Giờ xuất phát</Text>
              <Text style={styles.timeValue}>08:30</Text>
            </View>
          </View>
          <Card style={styles.busCard}>
            <Avatar.Icon icon="bus" size={40} style={{ alignSelf: "center" }} />
            <View style={styles.busInfo}>
              <Text style={styles.busNumber}>Tuyến 99</Text>
              <Text style={styles.busLine}>
                Đại học Bách Khoa CS2 - Đại học Bách Khoa CS1
              </Text>
              <Button mode='contained' style={styles.price}>150.000 đ</Button>
            </View>
          </Card>
        </View>
      </Card>
      <View style={styles.buttons}>
      <Button mode='contained' style={styles.paymentMethod} icon='wallet'>
        <Text>Chọn phương thức thanh toán</Text>
      </Button>
      <Button mode='contained' style={styles.payment}>
        <Text>Thanh toán</Text>
      </Button>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    // justifyContent: 'center',
  },
  goBack: {
    position: "absolute",
    top: 3,
    left: 5,
    zIndex: 1,
  },

  topCircle: {
    position: "absolute",
    top: 15,
    zIndex: 1,
  },
  cardContainer: {
    width: "90%",
    marginVertical: 10,
    position: "absolute",
    top: 45,
    paddingTop: 60,
  },
  upperSection: {
    alignItems: "center",
  },
  upperText1: {
    fontSize: 20,
  },
  upperText2: {
    paddingVertical: 10,
    fontSize: 30,
    fontWeight: "bold",
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
    width: "80%",
    alignSelf: "center",
  },
  lowerSection: {
    paddingHorizontal: 40,
  },
  date: {
    // alignItems: "center",
  },
  dateText: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  dateLabel: {
    textAlign: "left",
    fontSize: 20,
    fontWeight: "bold",
  },
  dateValue: {
    textAlign: "right",
    textAlignVertical: "center",
  },
  timeText: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
  },
  timeLabel: {
    textAlign: "left",
    fontSize: 20,
    fontWeight: "bold",
  },
  timeValue: {
    textAlign: "right",
    textAlignVertical: "center",
  },
  busCard: {
    width: "100%",
    padding: 10,
    marginVertical: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
  },
  busInfo: {
    alignItems: "center",
  },
  busNumber: {
    paddingVertical: 7,
    fontSize: 20,
    fontWeight: "bold",
  },
  busLine: {
    paddingVertical: 7,
    fontSize: 15,
    textAlign: "center",
    width: '80%',
  },
  price: {
    paddingVertical: 5,
    marginVertical: 10,
    fontSize: 20,
    fontWeight: "bold",
    // textColor: "red",
    width: '40%',
  },
  buttons: {
    position: 'absolute',
    bottom: 10,
  },
  paymentMethod: {
    // width: '100%',
    paddingHorizontal: 40,
    marginVertical: 10,
  },
  payment: {
    // width: '90%',
    marginVertical: 10,
    marginHorizontal: 0,
  },
});

export default Payment;
