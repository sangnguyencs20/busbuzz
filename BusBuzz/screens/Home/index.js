import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, Text, Searchbar, Surface, IconButton } from "react-native-paper";
import { StyleSheet, View } from "react-native";

const HomeScreen = ({ navigation }) => {
    const [departure, setDeparture] = useState('');
    const [destination, setDestination] = useState('');

    const handleSwap = () => {
        const temp = departure;
        setDeparture(destination);
        setDestination(temp);
    }

    return (
        <SafeAreaView style={styles.container}>
            <Surface
                mode="contained"
                style={styles.form}
            >
                <View style={styles.label}>
                    <Text variant="titleSmall">Xuất phát từ</Text>
                    <IconButton
                        icon="crosshairs-gps"
                        size={24}
                        onPress={() => console.log('Pressed')}
                    />
                </View>
                <Searchbar
                    placeholder="Vị trí hiện tại"
                    value={departure}
                    onIconPress={() => navigation.navigate('SearchScreen')}
                    onChangeText={setDeparture}
                    style={styles.searchbar}
                />
                <View style={styles.label}>
                    <Text variant="titleSmall">Đến</Text>
                    <IconButton
                        icon="swap-vertical"
                        size={24}
                        onPress={handleSwap}
                    />
                </View>
                <Searchbar
                    placeholder="Nơi đến"
                    onIconPress={() => navigation.navigate('SearchScreen')}
                    value={destination}
                    onChangeText={setDestination}
                    style={styles.searchbar}
                />
                <Button
                    mode="contained"
                    style={styles.searchbutton}
                    onPress={() => navigation.navigate('TicketBooking')}>
                    Tìm kiếm
                </Button>
            </Surface>
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    form: {
        width: '90%',
        borderRadius: 25,
        padding: 20,
    },
    label: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
    },
    searchbar: {
        marginTop: 5,
        marginBottom: 5,
    },
    searchbutton: {
        marginTop: 30,
    }
});

export default HomeScreen;