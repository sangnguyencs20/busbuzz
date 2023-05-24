import React from "react";
import { Appbar, Avatar } from "react-native-paper";

const AppbarComponent = ({ navigation }) => (
  <Appbar.Header>
    {navigation && <Appbar.BackAction onPress={() => navigation.goBack()} />}
    <Appbar.Content />
    <Avatar.Icon size={32} icon="account" style={{ marginRight: 10 }} />
  </Appbar.Header>
);

const styles = {
    leftIcon: {
        alignSelf: 'flex-end',
    },
};

export default AppbarComponent;
