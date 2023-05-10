import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, Text } from "react-native-paper";
import { StyleSheet, View, Image, BackHandler } from "react-native";

const Service = ({ navigation }) => {
    useEffect(() => {
        const backHandler = BackHandler.addEventListener('hardwareBackPress', () => true)
        return () => backHandler.remove()
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <Image source={require('../../assets/onboarding/ob2.png')} style={styles.img} />
            <Text variant="displayMedium" style={styles.titleText}>
                CSKH 24/7
            </Text>
            <Text variant="bodyLarge" style={styles.bodyText}>
                Chúng tôi luôn đề cao trải nghiệm của bạn.
                Có bất kì vấn đề gì?
                Lắc thiết bị của bạn trong khi sử dụng ứng dụng để gửi nhanh phản hồi!
            </Text>
            <Button mode="contained" onPress={() => navigation.navigate('LoginScreen')}>Bắt đầu nào!</Button>
        </SafeAreaView>
    )
}

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
        height: '45%',
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

export default Service;