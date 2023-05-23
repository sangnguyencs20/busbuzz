import React from "react";
import { StyleSheet, View } from "react-native";
import { Card, Title, Paragraph, Text } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const BusCard = ({busID, depart, arrive, time, price}) => {
  return (
    <Card mode="outlined" style={styles.card}>
      <View style={styles.row}>
        <View style={[styles.column, styles.leftColumn]}>
          <View style={styles.icon}>
            <Icon name="bus" size={35} />
          </View>
        </View>
        <View style={styles.divider} />
        <View style={[styles.column, styles.rightColumn]}>
          <Card.Content>
            <Title style={styles.title}>Tuyến số {busID}</Title>
            <Paragraph style={styles.paragraph}>
              {depart} - {arrive}
            </Paragraph>
            <View style={styles.divPara}>
              <Text style={styles.paragraph}>{time}</Text>
              <Text style={styles.price}>{price}</Text>
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

export default BusCard;
