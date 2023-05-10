import * as React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';

const SignUpScreen = ({ navigation }) => {
    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const handleSignUp = () => {
        // Implement sign-up logic here
    };

    const navigateToLogin = () => {
        navigation.navigate('Login'); // Replace 'Login' with the name of your login screen component
    };

    return (
        <View style={styles.container}>
            <TextInput
                mode='outlined'
                label="Tên người dùng"
                value={name}
                onChangeText={setName}
                style={styles.input}
            />
            <TextInput
                mode='outlined'
                label="Email"
                value={email}
                onChangeText={setEmail}
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
            <Button mode="contained" onPress={handleSignUp} style={styles.button}>
                Đăng ký
            </Button>
            <TouchableOpacity onPress={navigateToLogin}>
                <Text variant="bodyMedium" style={styles.loginText}>
                    Bạn đã có tài khoản? Đăng nhập ngay!
                </Text>
            </TouchableOpacity>
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
    loginText: {
        marginTop: 16,
        textAlign: 'center',
        bottom: 0,
    },
});

export default SignUpScreen;