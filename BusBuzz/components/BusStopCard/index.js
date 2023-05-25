import React from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { Card, Title, Paragraph, Text } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useSelector } from "react-redux";

const BusStopList = ({ busStopList }) => {
  return (
    <ScrollView>
      <Card mode="contained" style={styles.card}>
        {Array.isArray(busStopList) &&
          busStopList.map((stop) => (
            <BusStopCard style={styles.card} key={stop._id} busStop={stop} />
          ))}
      </Card>
    </ScrollView>
  );
};

const BusStopCard = ({ busStop }) => {
  const nameDeparture = useSelector((state) => state.search.departure.name);
  const nameDestination = useSelector((state) => state.search.destination.name);

  const isDeparture = busStop.name === nameDeparture;
  const isDestination = busStop.name === nameDestination;

  return (
    <View style={styles.row}>
      <View style={[styles.column, styles.leftColumn]}>
        <View style={styles.icon}>
          <Icon name="map-marker" size={30} />
        </View>
      </View>
      <View style={styles.divider} />
      <View style={[styles.column, styles.rightColumn]}>
        <Card.Content>
          <Paragraph
            style={[
              styles.paragraph,
              isDeparture || isDestination ? { fontWeight: "bold" } : null,
            ]}
          >
            {busStop.name}
          </Paragraph>
        </Card.Content>
      </View>
    </View>
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
    paddingTop: 8,
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

export default BusStopList;
