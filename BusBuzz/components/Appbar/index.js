import React from "react";
import { Appbar, Avatar, IconButton } from "react-native-paper";

const AppbarComponent = ({ navigation }) => (
  <Appbar.Header>
    {navigation && <Appbar.BackAction onPress={() => navigation.goBack()} />}
    <Appbar.Content />
    <IconButton
      mode="contained"
      style={styles.btn}
      icon="account"
      onPress={() => navigation.navigate("UserScreen")}
    />
  </Appbar.Header>
);

const styles = {
  btn: {
    marginRight: 10,
  },
};

export default AppbarComponent;
