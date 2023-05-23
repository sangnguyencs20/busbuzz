import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Card, Button, Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';


const PaymentSuccess = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.successText} variant='headlineMedium'>Thanh toán thành công</Text>
            <Image style={styles.qr}source={require('../../assets/payment/qr.png')} />
            <Text style={styles.text} variant='bodyMedium'>Bạn có thể trở về màn hình chính để xem chi tiết thông tin về vé xe đã đặt</Text>
            <Button style={styles.goHome} mode='contained' onPress={() => navigation.navigate('HomeScreen')}>Quay lại</Button>
            <Button style={styles.goToHistory} mode='contained' onPress={() => navigation.navigate('SearchResultScreen')}>Xem lịch sử</Button>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: '10%',
    },
    successText: {
        marginBottom: '10%',
    },
    qr: {
        width: 277,
        height: 277,
        marginHorizontal: '10%',
    },
    text: {
        marginVertical: '10%',
    },
    goHome: {
        marginVertical: '5%',
        width: '100%',
    },
    goToHistory: {
        marginVertical: '5%',
        width: '100%',
    },
});

export default PaymentSuccess;