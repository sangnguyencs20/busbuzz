import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { API_URL } from "@env";

const loginUrl = `${API_URL}/login`;

import { View, StyleSheet, Image, TouchableOpacity, Alert } from "react-native";
import {
  TextInput,
  Button,
  Text,
  TouchableRipple,
  Snackbar,
} from "react-native-paper";

function showAlertModal(title, message) {
  Alert.alert(title, message);
}

async function storeTokens(tokens) {
  try {
    if (tokens.accessToken) {
      await AsyncStorage.setItem("accessToken", tokens.accessToken);
    }
    if (tokens.refreshToken) {
      await AsyncStorage.setItem("refreshToken", tokens.refreshToken);
    }
    if (tokens.user._id) {
      await AsyncStorage.setItem("userID", tokens.user._id);
    }
  } catch (error) {
    console.error("Error storing tokens:", error);
  }
}

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  async function handleLogin() {
    try {
      const response = await axios.post(loginUrl, {
        username,
        password,
      });

      if (response.status === 200) {
        const tokens = response.data;
        console.log("ATokens:", tokens.accessToken);
        console.log("UserId:", tokens.user._id);
        storeTokens(tokens);
        
        //Lưu thông tin user fullName
        const fullName = response.data.user.fullName;
        AsyncStorage.setItem('fullName', fullName)

        navigation.navigate("HomeScreen");
      } else {
        const errorData = response.data;
        showAlertModal("Login Error", errorData.message);
      }
    } catch (error) {
      showAlertModal("Login Error", "An error occurred while logging in");
      console.error("Error during login:", error);
    }
  }
  const [snackbarVisible, setSnackbarVisible] = useState(false);

  const handleSnackbarDismiss = () => {
    setSnackbarVisible(false);
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/login/login.png")}
        style={styles.img}
      />
      <Text variant="displaySmall" style={styles.title}>
        Đăng nhập
      </Text>

      <View style={styles.forgotPasswordContainer}>
        <Text style={styles.forgotPasswordText}>Quên mật khẩu?</Text>
      </View>
      <TextInput
        mode="outlined"
        label="Tên người dùng"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
        style={styles.input}
      />
      <TextInput
        mode="outlined"
        label="Mật khẩu"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        autoCapitalize="none"
        style={styles.input}
      />
      <Button mode="contained" onPress={handleLogin}>
        Đăng nhập
      </Button>
      <TouchableOpacity style={styles.createAccountContainer}>
        <Text variant="bodyMedium" style={styles.createAccountText}>
          Bạn chưa có tài khoản?{" "}
        </Text>
        <TouchableRipple
          onPress={() => {
            navigation.navigate("SignUpScreen");
          }}
        >
          <Text style={styles.createAccountLink}>Tạo mới ngay</Text>
        </TouchableRipple>
      </TouchableOpacity>
      <Snackbar
        visible={snackbarVisible}
        onDismiss={handleSnackbarDismiss}
        duration={5000}
        onIconPress={handleSnackbarDismiss}
      >
        Sai tên đăng nhập hoặc mật khẩu
      </Snackbar>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "85%",
    justifyContent: "center",
    paddingHorizontal: 16,
    alignSelf: "center",
  },
  smaller: {
    flex: 0.8,
    alignItems: "center",
    padding: 25,
    width: "100%",
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
  },
  img: {
    marginBottom: 20,
    height: 235,
    width: 307,
  },
  title: {
    alignSelf: "flex-start",
    marginBottom: 20,
  },
  forgotPasswordContainer: {
    alignSelf: "flex-end",
    marginBottom: 10,
  },
  forgotPasswordText: {
    fontWeight: "bold",
    fontSize: 16,
    textDecorationLine: "underline",
  },
  formContainer: {
    width: "100%",
    marginBottom: 15,
  },
  input: {
    marginBottom: 15,
  },
  createAccountText: {
    textAlign: "center",
    bottom: 0,
  },
  createAccountLink: {
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
  createAccountContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  footer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    padding: 10,
    alignItems: "center",
  },
  footerText: {
    fontSize: 12,
    color: "#777",
  },
});

export default LoginScreen;
