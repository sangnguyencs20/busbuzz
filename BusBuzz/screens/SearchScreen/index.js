import React, { useState, useEffect, memo } from "react";
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { SafeAreaView } from "react-native-safe-area-context";
import { Searchbar, List } from "react-native-paper";
import { StyleSheet, FlatList } from "react-native";
import { useSelector, useDispatch } from "react-redux";

import { API_URL } from '@env';
import { setDeparture, setDestination } from '../../reducers/searchReducer';

const SearchScreen = memo(({ navigation }) => {
    const dispatch = useDispatch();
    const isDepartureSearch = useSelector((state) => state.search.isDepartureSearch);

    const [busStops, setBusStops] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);

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

    async function handleSearch(query) {
        try {
            const filteredData = busStops.filter((item) => {
                const itemName = (item.name || '').toLowerCase();
                const itemAddress = (item.address || '').toLowerCase();
                const searchQueryLowerCase = query.toLowerCase();

                return (
                    itemName.includes(searchQueryLowerCase) ||
                    itemAddress.includes(searchQueryLowerCase)
                );
            });

            setSearchQuery(query);
            setSearchResults(filteredData);
        } catch (error) {
            console.error(error);
        }
    }

    const handleLocationSelect = (location) => {
        if (isDepartureSearch) {
            dispatch(setDeparture(location));
        } else {
            dispatch(setDestination(location));
        }
        navigation.navigate('HomeScreen');
    };

    return (
        <SafeAreaView style={styles.container}>
            <Searchbar
                mode='view'
                showDivider={false}
                placeholder="Chọn địa điểm"
                onChangeText={handleSearch}
                value={searchQuery}
            />

            <FlatList
                data={searchResults}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <List.Item
                        title={item.name}
                        description={item.address}
                        onPress={() => handleLocationSelect(item)}
                    />
                )}
            />
        </SafeAreaView>
    )
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    separator: {
        height: StyleSheet.hairlineWidth,
        backgroundColor: 'gray',
    },
});

export default SearchScreen;
