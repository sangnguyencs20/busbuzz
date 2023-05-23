import * as React from "react";
import { View, StyleSheet, TouchableOpacity, Image } from "react-native";
import { TextInput, Button, Text, TouchableRipple } from "react-native-paper";
import { API_URL } from "@env";

// const signupUrl = `${API_URL}/signup`;

const SignUpScreen = ({ navigation }) => {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleSignUp = () => {
    // Implement sign-up logic here
  };

  const navigateToLogin = () => {
    navigation.navigate("LoginScreen"); // Replace 'Login' with the name of your login screen component
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/signup/signup.png")}
        style={styles.img}
      />
      <TextInput
        mode="outlined"
        label="Tên người dùng"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <TextInput
        mode="outlined"
        label="Email"
        value={email}
        onChangeText={setEmail}
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
    justifyContent: "center",
    paddingHorizontal: 16,
  },
  input: {
    marginBottom: 16,
    marginHorizontal: 40,
  },
  button: {
    marginTop: 16,
    marginHorizontal: 40,
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
