import React from "react";
import { StyleSheet, View } from "react-native";
import { Card, Title, Paragraph, Text } from "react-native-paper";
// import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Appearance } from "react-native";

const BusCard = ({
  busNumber,
  content,
  price,
  icon,
  day,
  month,
  departHour,
  departMinute,
  destHour,
  destMinute,
  duration = 0,
}) => {
  let setGreenCard = false;
  const lightColorScheme = Appearance.getColorScheme() === "light";
  const greenCardLightTheme = "rgb(113, 247, 236)";
  const greenCardDarkTheme = "rgb(0, 80, 75)";
  const iconColor = "#ffffff";

  const infoComponent = () => {
    if (day && month && duration == 0) {
      return <Text>{`${day} tháng ${month}`}</Text>;
    } else if (day && month && duration != 0) {
      const durationHour = Math.floor(duration / 60);
      const durationMinute = duration % 60;
      setGreenCard = true;

      return (
        <Text>{`${day} tháng ${month} - ${durationHour} giờ ${durationMinute} phút`}</Text>
      );
    } else if (
      day == null &&
      month == null &&
      duration == 0 &&
      departHour &&
      departMinute &&
      destHour &&
      destMinute
    ) {
      return (
        <Text>{`${departHour}:${departMinute} - ${destHour}:${destMinute}`}</Text>
      );
    }
    return null;
  };

  return (
    <View>
      <Card
        mode="outlined"
        style={[
          styles.card,
          {
            backgroundColor: lightColorScheme
              ? greenCardLightTheme
              : greenCardDarkTheme,
          },
        ]}
      >
        <View style={styles.row}>
          <View style={[styles.column, styles.leftColumn]}>
            <View style={[styles.icon, !lightColorScheme ? iconColor : null]}>
              {icon}
            </View>
          </View>
          <View style={styles.divider} />
          <View style={[styles.column, styles.rightColumn]}>
            <Card.Content>
              <Title style={styles.title}>{`Tuyến số ${busNumber}`}</Title>
              <Paragraph style={styles.paragraph}>{content}</Paragraph>
              <View style={styles.divPara}>
                <Text style={styles.paragraph2}>{infoComponent()}</Text>
                <Text style={styles.price}>{price}</Text>
              </View>
            </Card.Content>
          </View>
        </View>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 16,
    borderRadius: 25,
  },
  // greenCard: {
  //   backgroundColor: theme.colors.primary,
  //   margin: 16,
  //   borderRadius: 25,
  // },
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
  paragraph2: {
    alignSelf: "flex-start",
    fontSize: 13,
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
