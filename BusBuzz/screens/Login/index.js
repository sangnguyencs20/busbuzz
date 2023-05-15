import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import axios from 'axios';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

function showAlertModal(title, message) {
    Alert.alert(title, message);
}


async function storeTokens(tokens) {
    try {
        if (tokens.accessToken) {
            await AsyncStorage.setItem('accessToken', tokens.accessToken);
        }
        if (tokens.refreshToken) {
            await AsyncStorage.setItem('refreshToken', tokens.refreshToken);
        }
        console.log('Tokens stored successfully');
        console.log('accessToken:', tokens.accessToken);
    } catch (error) {
        console.error('Error storing tokens:', error);
    }
}

const LoginScreen = ({ navigation }) => {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');

    async function handleLogin() {
        try {
            const response = await axios.post('http://192.168.3.206:3000/login', {
                username,
                password
            });

            if (response.status === 200) {
                const tokens = response.data;
                storeTokens(tokens);
                navigation.navigate('HomeScreen');
            } else {
                const errorData = response.data;
                showAlertModal('Login Error', errorData.message);
            }
        } catch (error) {
            showAlertModal('Login Error', 'An error occurred while logging in');
            console.error('Error during login:', error);
        }
    }



    return (
        <View style={styles.container}>
            <TextInput
                mode='outlined'
                label="Tên ngưi dùng"
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
