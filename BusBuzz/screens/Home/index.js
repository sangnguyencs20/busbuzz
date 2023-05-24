import React, { useState, useEffect } from "react";
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Lottie from 'lottie-react-native';
import * as Location from 'expo-location';

import { useSelector, useDispatch } from 'react-redux';
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, Text, Searchbar, Surface, IconButton } from "react-native-paper";
import { StyleSheet, View, BackHandler } from "react-native";

import { API_URL } from '@env';
import { setDeparture, setSearchType, swapLocations } from '../../reducers/searchReducer';

const HomeScreen = ({ navigation }) => {
    // Prevent going back to the previous screen
    const handleBackButtonPress = () => {
        return true;
    };
    useEffect(() => {
        const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackButtonPress);
        return () => backHandler.remove();
    }, []);

    const dispatch = useDispatch();
    const departure = useSelector((state) => state.search.departure.name.toString());
    const destination = useSelector((state) => state.search.destination.name.toString());
    const [busStops, setBusStops] = useState([]);

    useEffect(() => {
        async function fetchBusStops() {
            const busStopsUrl = `${API_URL}/busStops/`;
            try {
                const accessToken = await AsyncStorage.getItem('accessToken');
                const response = await axios.get(busStopsUrl, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${accessToken}`, // Pass the access token in the Authorization header
                    },
                });
                if (response.status === 200) {
                    const fetchedBusStops = response.data;
                    setBusStops(fetchedBusStops);
                } else {
                    console.log("Response status:", response.status);
                }
            } catch (error) {
                console.error(error);
            }
        }
        fetchBusStops();
    }, []);

    const handleSearchbarPress = (payload) => {
        if (payload === 'departure') {
            dispatch(setSearchType(true));
        } else {
            dispatch(setSearchType(false));
        }
        navigation.navigate('SearchScreen');
    };

    const getNearestStop = (latitude, longitude) => {
        let minDistance;
        let nearestStop;
        busStops.forEach((stop) => {
            const distance = Math.sqrt(Math.pow(latitude - stop.latitude, 2) + Math.pow(longitude - stop.longitude, 2));
            if (minDistance === undefined || distance < minDistance) {
                minDistance = distance;
                nearestStop = stop;
            }
        })
        return nearestStop;
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
            const nearestStop = getNearestStop(latitude, longitude);
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
            <View style={{ width: '100%', position: 'relative', height: 60, zIndex: 10 }}>
                <IconButton
                    mode="contained-tonal"
                    icon="account"
                    size={30}
                    style={{ position: 'absolute', right: 5, }}
                    onPress={() => navigation.navigate('SearchScreen')}
                />
            </View>
            {/* <View style={styles.lottieContainer}>
                <Lottie
                    source={require('../../assets/home/bus.json')}
                    autoPlay
                    style={styles.lottie}
                />
            </View> */}
            <View style={styles.form}>
                <Text variant="displayMedium" style={{ marginVertical: 15 }}>Hôm nay bạn muốn đi đâu?</Text>
                <Surface
                    mode="contained"
                    style={{
                        borderRadius: 25,
                        padding: 20,
                    }}
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
                </Surface>
                <Button
                    mode="contained"
                    style={styles.searchbutton}
                    onPress={() => navigation.navigate('SearchResultScreen')}>
                    Tìm kiếm
                </Button>
            </View>
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    lottieContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'right',
    },
    lottie: {
        width: '100%',
        top: 20,
        zIndex: 1,
    },
    form: {
        width: '90%',
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