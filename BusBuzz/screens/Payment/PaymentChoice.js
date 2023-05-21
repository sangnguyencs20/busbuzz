import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Button, Text, IconButton } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';

const paymentCard = (paymentName, partner) => {
    return (
        <Card style={styles.cardContainer}>
            
        </Card>
    )


}

const PaymentChoice = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.container}>
            <IconButton mode="outlined" style={styles.goBack} icon='arrow-left' size={30} />
            <View style={styles.title}>
                <Text style={styles.titleText}>Chọn phương thức thanh toán</Text>
            </View>
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: '#fff',
        alignItems: 'center',
    },
    goBack: {
        position: 'absolute',
        top: 0,
        left: 0,
    },
    title: {
        marginTop: 30,
        marginBottom: 30,
        fontSize: 45,
        fontWeight: 'bold',
    },
});


export default PaymentChoice;