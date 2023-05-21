import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Searchbar, List, } from "react-native-paper";
import { StyleSheet, FlatList } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { setDeparture, setDestination } from '../../reducers/searchReducer';

import data from "./data";

const SearchScreen = ({ navigation }) => {
    const dispatch = useDispatch();
    const isDepartureSearch = useSelector((state) => state.search.isDepartureSearch);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const handleSearch = (query) => {
        setSearchQuery(query);

        const filteredData = data.filter((item) => {
            const itemName = (item.name || '').toLowerCase();
            const itemAddress = (item.address || '').toLowerCase();
            const searchQueryLowerCase = query.toLowerCase();

            return (
                itemName.includes(searchQueryLowerCase) ||
                itemAddress.includes(searchQueryLowerCase)
            );
        });

        setSearchResults(filteredData);
    };

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
};

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
