import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, Text } from "react-native-paper";
import { StyleSheet, View, Image, BackHandler } from "react-native";

const Security = ({ navigation }) => {
    useEffect(() => {
        const backHandler = BackHandler.addEventListener('hardwareBackPress', () => true)
        return () => backHandler.remove()
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <Image source={require('../../assets/onboarding/ob3.png')} style={styles.img} />
            <Text variant="displayMedium" style={styles.titleText}>
                Bảo mật thông tin
            </Text>
            <Text variant="bodyLarge" style={styles.bodyText}>
                Tất cả các thông tin của bạn (đúng rồi đấy, là tất cả) luôn được giữ an toàn bằng những tiêu chuẩn bảo mật tối tân nhất.
                Không phải lo sợ điều gì nữa cả!
            </Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Button mode="contained-tonal" onPress={() => navigation.navigate('LoginScreen')}>Bỏ qua</Button>
                <Button mode="contained" onPress={() => navigation.navigate('Service')}>Tiếp theo</Button>
            </View>
        </SafeAreaView >
    )
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
        height: '32%',
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

export default Security;