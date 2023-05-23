import * as React from "react";
import axios from "axios";
import { View, StyleSheet, TouchableOpacity, Image, Alert } from "react-native";
import { TextInput, Button, Text, TouchableRipple } from "react-native-paper";
import { API_URL } from "@env";

function showAlertModal(title, message) {
  Alert.alert(title, message);
}

const signUpUrl = `${API_URL}/signup`;

const SignUpScreen = ({ navigation }) => {
  const [username, setUsername] = React.useState("");
  const [fullName, setFullName] = React.useState("");
  const [password, setPassword] = React.useState("");

  async function handleSignUp() {
    try {
      const response = await axios.post(signUpUrl, {
        username,
        password,
        fullName,
      });

      if (response.status === 201) {
        showAlertModal("Sign Up Success", "Your account has been created successfully");
        navigation.navigate("LoginScreen");
      } else {
        const errorData = response.data;
        showAlertModal("Sign Up Error", errorData.message);
      }
    } catch (error) {
      if (error.response && error.response.status === 409) {
        showAlertModal("Sign Up Error:", "Username is already taken. Please choose a different username.");
      } else {
        showAlertModal("Sign Up Error:", "An error occurred while signing up");
        console.error("Error during signup:", error);
      }
    }
  }

  const navigateToLogin = () => {
    navigation.navigate("LoginScreen");
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/signup/signup.png")}
        style={styles.img}
      />
      <Text variant="displaySmall" style={styles.title}>
        Đăng ký
      </Text>
      <TextInput
        mode="outlined"
        label="Tên người dùng"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
      />
      <TextInput
        mode="outlined"
        label="Mật khẩu"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <TextInput
        mode="outlined"
        label="Tên đầy đủ"
        value={fullName}
        onChangeText={setFullName}
        style={styles.input}
      />
      <Button mode="contained" onPress={handleSignUp} style={styles.button}>
        Đăng ký
      </Button>
      <TouchableOpacity onPress={navigateToLogin} style={styles.loginContainer}>
        <Text variant="bodyMedium" style={styles.loginText}>Bạn đã có tài khoản? </Text>
        <TouchableRipple
          onPress={() => {
            navigation.navigate("LoginScreen");
          }}
        >
          <Text style={styles.loginLink}>Đăng nhập ngay</Text>
        </TouchableRipple>
      </TouchableOpacity>
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
  title: {
    alignSelf: "flex-start",
    marginBottom: 20,
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginTop: 16,
  },
  img: {
    width: 293,
    height: 173,
    marginBottom: 50,
    alignSelf: "center",
  },
  loginContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  loginText: {
    textAlign: "center",
    bottom: 0,
  },
  loginLink: {
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
});

export default SignUpScreen;
