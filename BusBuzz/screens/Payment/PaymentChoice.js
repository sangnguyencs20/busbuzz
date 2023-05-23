import React from "react";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Card, Text, IconButton } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

const paymentCard = (paymentName, partner, img) => {
  return (
    <Card mode="contained">
      <View style={styles.cardContainer}>
        <View style={styles.cardLeft}>
          <Text variant="titleMedium">{paymentName}</Text>
        </View>
        <View style={styles.cardRight}>
          <Image source={img} style={{ height: 80, width: 80 }} />
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
  ];

  return (
    <SafeAreaView style={styles.container}>
      <IconButton
        style={styles.goBack}
        icon="arrow-left"
        size={30}
        onPress={() => {
          navigation.navigate("Payment");
        }}
      />
      <View style={styles.title}>
        <Text variant="headlineMedium">Chọn phương thức</Text>
      </View>
      <View style={styles.paymentList}>
        {paymentList.map((payment) => {
          return (
            <TouchableOpacity style={{marginVertical: "5%"}}
              key={payment.paymentName}
              onPress={() => navigation.navigate("Payment")}
            >
              {paymentCard(payment.paymentName, payment.partner, payment.img)}
            </TouchableOpacity>
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
    // paddingVertical: "5%",
    flexDirection: "row",
  },
  cardLeft: {
    flex: 0.7,
    alignItems: "flex-start",
    justifyContent: "center",
    // alignSelf: "center",
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
    alignItems: "center",
  },
  goBack: {
    position: "absolute",
    top: "5%",
    left: "5%",
  },
  title: {
    marginVertical: "10%",
  },
  paymentList: {
    width: "100%",
    alignItems: "center",
    // flexDirection: "column",
  },
});

export default PaymentChoice;
