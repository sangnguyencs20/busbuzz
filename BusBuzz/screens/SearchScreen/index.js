import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Searchbar, List, Divider } from "react-native-paper";
import { StyleSheet, FlatList } from "react-native";

import data from "./data";

const SearchScreen = ({ navigation }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    // const renderSeparator = () => <Divider style={styles.separator} />;

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
                        onPress={() => navigation.navigate('HomeScreen')}
                    />
                )}
            // ItemSeparatorComponent={renderSeparator}
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