import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button } from 'react-native-paper';

const LoginScreen = ({ navigation }) => {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');

    const handleLogin = () => {
        navigation.navigate('HomeScreen');
    };

    return (
        <View style={styles.container}>
            <TextInput
                mode='outlined'
                label="Tên người dùng"
                value={username}
                onChangeText={setUsername}
                style={styles.input}
            />
            <TextInput
                mode='outlined'
                label="Mật khẩu"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                style={styles.input}
            />
            <Button mode="contained" onPress={handleLogin} style={styles.button}>
                Đăng nhập
            </Button>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 16,
    },
    input: {
        marginBottom: 16,
    },
    button: {
        marginTop: 16,
    },
});

export default LoginScreen;
