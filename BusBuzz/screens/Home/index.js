import React, { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { setDeparture, setSearchType, swapLocations } from '../../reducers/searchReducer';
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, Text, Searchbar, Surface, IconButton } from "react-native-paper";
import { StyleSheet, View } from "react-native";
import * as Location from 'expo-location';

import data from './data';

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

    const getNearestStop = (latitude, longitude, data) => {
        let minDistance
        let nearestStop
        data.forEach((stop) => {
            const distance = Math.sqrt(Math.pow(latitude - stop.latitude, 2) + Math.pow(longitude - stop.longitude, 2))
            if (minDistance === undefined || distance < minDistance) {
                minDistance = distance
                nearestStop = stop
            }
        })
        return nearestStop
    }

    const handleCurrentLocationPress = async () => {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            return;
        }

        try {
            const location = await Location.getCurrentPositionAsync({});
            const { latitude, longitude } = location.coords;

            console.log('Latitude:', latitude);
            console.log('Longitude:', longitude);

            // Perform any other actions with the location data
            const nearestStop = getNearestStop(latitude, longitude, data);
            dispatch(setDeparture(nearestStop));

        } catch (error) {
            console.log('Error getting location:', error);
        }
    };

    const handleSwapLocationsPress = () => {
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
                        onPress={handleCurrentLocationPress}
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
                        onPress={() => handleSwapLocationsPress()}
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
                    onPress={() => navigation.navigate('SearchResultScreen')}>
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