import React, { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { setSearchType, swapLocations } from '../../reducers/searchReducer';
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, Text, Searchbar, Surface, IconButton } from "react-native-paper";
import { StyleSheet, View } from "react-native";

const HomeScreen = ({ navigation }) => {
    const dispatch = useDispatch();

    const departure = useSelector((state) => state.search.departure.name.toString());
    const destination = useSelector((state) => state.search.destination.name.toString());

    const handleSearchbarPress = (payload) => {
        if (payload === 'departure') {
            dispatch(setSearchType(true));
        } else {
            dispatch(setSearchType(false));
        }
        navigation.navigate('SearchScreen');
    };

    const handleSwapLocations = () => {
        dispatch(swapLocations());
    };

    const truncateInput = (input, maxLength) => {
        if (input.length > maxLength) {
            return input.substring(0, maxLength) + "...";
        }
        return input;
    };

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
                        onPress={() => console.log('Current location button pressed')}
                    />
                </View>
                <Searchbar
                    placeholder="Vị trí hiện tại"
                    value={truncateInput(departure, 25)}
                    onIconPress={() => handleSearchbarPress('departure')}
                    onChangeText={(text) => { }}
                    style={styles.searchbar}
                />
                <View style={styles.label}>
                    <Text variant="titleSmall">Đến</Text>
                    <IconButton
                        icon="swap-vertical"
                        size={24}
                        onPress={() => handleSwapLocations()}
                    />
                </View>
                <Searchbar
                    placeholder="Nơi đến"
                    onIconPress={() => handleSearchbarPress('destination')}
                    value={truncateInput(destination, 25)}
                    onChangeText={(text) => { }}
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