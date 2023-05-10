import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, Text } from "react-native-paper";
import { View, Image, StyleSheet, BackHandler } from "react-native";

const TicketBooking = ({ navigation }) => {
    useEffect(() => {
        const backHandler = BackHandler.addEventListener('hardwareBackPress', () => true)
        return () => backHandler.remove()
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <Image source={require('../../assets/onboarding/ob1.png')} style={styles.img} />
            <Text variant="displayMedium" style={styles.titleText}>
                Đặt vé dễ dàng
            </Text>
            <Text variant="bodyLarge" style={styles.bodyText}>
                Không còn lo lắng về việc tìm tuyến xe phù hợp hay bối rối với biểu đồ thời gian xe nữa.
                Tiết kiệm thời gian và công sức cho việc di chuyển hàng ngày của bạn.
            </Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Button mode="contained-tonal" onPress={() => navigation.navigate('LoginScreen')}>Bỏ qua</Button>
                <Button mode="contained" onPress={() => navigation.navigate('Security')}>Tiếp theo</Button>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '90%',
        alignSelf: 'center',
        justifyContent: 'space-between',
        marginTop: '5%',
        marginBottom: '5%',
    },
    img: {
        width: '100%',
        height: '50%',
    },
    titleText: {
        textAlign: 'center',
        fontWeight: 'bold',
    },
    bodyText: {
        alignSelf: 'center',
        textAlign: 'justify',
        width: '95%',
    }
});

export default TicketBooking;