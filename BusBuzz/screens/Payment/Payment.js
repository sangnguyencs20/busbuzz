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
      <IconButton
        style={styles.goBack}
        icon='arrow-left'
        size={30} />
      <View style={styles.topCircle}>
        <Avatar.Icon icon="ticket" size={80} />
      </View>
      <Card mode="contained" style={styles.cardContainer}>
        <Card.Content>
          <View style={styles.upperSection}>
            <Text variant="headlineSmall">Hành khách</Text>
            <Text variant="headlineSmall" style={{ fontWeight: 700 }}>ABC</Text>
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
                <Text variant="titleMedium">20/5/2022</Text>
              </View>
              <View style={styles.dateTime}>
                <Text variant="titleMedium">Giờ xuất phát</Text>
                <Text variant="titleMedium">08:30</Text>
              </View>
            </View>
            <Card mode="contained" >
              <Avatar.Icon icon="bus" size={50} style={{ alignSelf: "center", marginTop: 15, marginBottom: 5 }} />
              <View style={styles.busInfo}>
                <Text variant="titleLarge" style={{ fontWeight: 700 }}>99</Text>
                <Text variant="bodyMedium" style={{ textAlign: "center", margin: 5 }}>
                  Đại học Bách Khoa CS2 - Đại học Bách Khoa CS1
                </Text>
                <Button mode='contained' style={{ marginVertical: 15 }}>7.000đ</Button>
              </View>
            </Card>
          </View>
        </Card.Content>
      </Card>
      <View style={styles.buttons}>
        <Button mode='contained' style={styles.paymentMethod} icon='wallet' onPress={() => navigation.navigate('HomeScreen')}>
          Chọn phương thức thanh toán
        </Button>
        <Button mode='contained' style={styles.payment} onPress={() => navigation.navigate('HomeScreen')}>
          Thanh toán
        </Button>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
    position: 'absolute',
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
