import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { Avatar, IconButton, Card, Text } from "react-native-paper";

import { API_URL } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const UserCard = ({ navigation }) => {
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    async function getUserInfo() {
      const userId = await AsyncStorage.getItem("userID");
      const searchUrl = `${API_URL}/users/${userId}`;
      try {
        const accessToken = await AsyncStorage.getItem("accessToken");
        const response = await axios.get(searchUrl, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (response.status === 200) {
          const data = response.data;
          setUserInfo(data);
        } else {
          console.log("Response status:", response.status);
        }
      } catch (error) {
        console.error(error);
      }
    }
    getUserInfo();
  }, []);

  //helper function to format date
  const dateArray = String(userInfo.createdAt).substring(0, 10).split("-");
  const formattedDate = `${dateArray[2]}/${dateArray[1]}/${dateArray[0]}`;

  return (
    <Card mode="contained" style={styles.card}>
      <View style={styles.container}>
        <View style={styles.leftColumn}>
          <Avatar.Icon size={40} icon="account" />
        </View>
        <View style={styles.middleColumn}>
          <Text style={styles.fullName} >{userInfo.fullName}</Text>
          <Text>Thành viên từ {formattedDate}</Text>
        </View>
        <View style={styles.rightColumn}>
          <IconButton
            icon="cog"
            onPress={() => navigation.navigate("SettingsScreen")}
          />
        </View>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  card: {
    margin: 16,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  leftColumn: {
    width: "20%",
  },
  middleColumn: {
    width: "60%",
    alignItems: "flex-start",
  },
  rightColumn: {
    width: "20%",
    alignItems: "flex-end",
  },
  fullName: {
    fontSize: 16,
    fontWeight: "bold",
    paddingBottom: 4,
  },
});

export default UserCard;
