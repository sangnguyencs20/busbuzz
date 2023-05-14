import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  View,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import {
  TextInput,
  Button,
  Text,
  TouchableRipple,
  Snackbar,
} from "react-native-paper";

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const [snackbarVisible, setSnackbarVisible] = useState(false);

  const handleSnackbarDismiss = () => {
    setSnackbarVisible(false);
  };

  const handleLogin = () => {
    navigation.navigate("HomeScreen");
  };

  return (
    <KeyboardAvoidingView behavior="height" style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <View style={styles.smaller}>
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
            <View style={styles.formContainer}>
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
                Log in
              </Button>
            </View>
          </View>
          <View style={styles.createAccountContainer}>
            <Text style={styles.createAccountText}>Bạn chưa có tài khoản?</Text>
            <TouchableRipple
              onPress={() => {
                navigation.navigate("Signup");
              }}
            >
              <Text style={styles.createAccountLink}>Tạo mới tại đây</Text>
            </TouchableRipple>
          </View>
          <Snackbar
            visible={snackbarVisible}
            onDismiss={handleSnackbarDismiss}
            duration={5000}
            onIconPress={handleSnackbarDismiss}
          >
            Sai tên đăng nhập hoặc mật khẩu
          </Snackbar>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
  },
  title: {
    alignSelf: "flex-start",
    marginBottom: 20,
  },
  forgotPasswordContainer: {
    alignSelf: "flex-end",
    marginBottom: 15,
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
  createAccountContainer: {
    flexDirection: "row",
    position: "absolute",
    bottom: 50,
  },
  createAccountText: {
    marginRight: 5,
  },
  createAccountLink: {
    fontWeight: "bold",
    fontSize: 16,
    textDecorationLine: "underline",
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
