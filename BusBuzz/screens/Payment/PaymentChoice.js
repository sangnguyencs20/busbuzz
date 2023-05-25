import React from "react";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Card, Text, IconButton, TouchableRipple } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import AppbarComponent from "../../components/Appbar";

const paymentCard = (paymentName, partner, img) => {
  return (
    <Card mode="contained" style = {styles.card}>
      <View style={styles.cardContainer}>
        <View style={styles.cardLeft}>
          <Text variant="titleMedium">{paymentName}</Text>
        </View>
        <View style={styles.cardRight}>
          <Image source={img} style={{ height: 80, width: 80 }} resizeMode="contain"/>
        </View>
      </View>
    </Card>
  );
};

const PaymentChoice = ({ navigation }) => {
  const paymentList = [
    {
      paymentName: "Momo",
      partner: true,
      img: require("../../assets/payment/momo.png"),
    },
    {
      paymentName: "ZaloPay",
      partner: false,
      img: require("../../assets/payment/zalopay.png"),
    },
    {
      paymentName: "9Pay",
      partner: false,
      img: require("../../assets/payment/9pay.png"),
    },
    {
      paymentName: "MasterCard",
      partner: false,
      img: require("../../assets/payment/mastercard.png"),
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <AppbarComponent navigation={navigation} />
      <View style={styles.title}>
        <Text variant="headlineMedium">Chọn phương thức</Text>
      </View>
      <View style={styles.paymentList}>
        {paymentList.map((payment) => {
          return (
            <TouchableRipple style={{marginVertical: "5%", borderRadius: 25,}}
              key={payment.paymentName}
              onPress={() => navigation.navigate("Payment")}
            >
              {paymentCard(payment.paymentName, payment.partner, payment.img)}
            </TouchableRipple>
          );
        })}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  //Card
  cardContainer: {
    width: 350,
    paddingVertical: "3%",
    flexDirection: "row",
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  card: {
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  cardLeft: {
    flex: 0.7,
    alignItems: "flex-start",
    justifyContent: "center",
    paddingLeft: "15%",
  },
  cardRight: {
    flex: 0.3,
    alignItems: "flex-start",
    justifyContent: "center",
  },
  //Container
  container: {
    flex: 1,
  },
  title: {
    alignSelf: "center",
    marginVertical: 15,
  },
  paymentList: {
    width: "100%",
    alignItems: "center",
  },
});

export default PaymentChoice;
