import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Searchbar, List, Divider } from "react-native-paper";
import { StyleSheet } from "react-native";

const SearchScreen = ({ navigation }) => {
    const [searchQuery, setSearchQuery] = React.useState('');
    const data = [
        {
            "name": "Trường Đại học Bách Khoa",
            "address": "268 Lý Thường Kiệt, Phường 14, Quận 10, Thành phố Hồ Chí Minh",
            "latitude": 10.773588,
            "longitude": 106.682093
        },
        {
            "name": "Trường Đại học Khoa học Tự nhiên",
            "address": "227 Nguyễn Văn Cừ, Phường 4, Quận 5, Thành phố Hồ Chí Minh",
            "latitude": 10.762622,
            "longitude": 106.682093
        },
        {
            "name": "Trường Đại học Kinh tế - Luật",
            "address": "669 Điện Biên Phủ, Phường 1, Quận 3, Thành phố Hồ Chí Minh",
            "latitude": 10.773588,
            "longitude": 106.682093
        },
        {
            "name": "Trường Đại học Sư phạm Kỹ thuật",
            "address": "1 Võ Văn Ngân, Phường Linh Chiểu, Quận Thủ Đức, Thành phố Hồ Chí Minh",
            "latitude": 10.773588,
            "longitude": 106.682093
        },
    ];
    return (
        <SafeAreaView style={styles.container}>
            <Searchbar
                mode='view'
                showDivider={false}
                placeholder="Chọn địa điểm"
                onChangeText={setSearchQuery}
                value={searchQuery}
            />
            <List.Section>
                {data.map((item, index) => (
                    <List.Item
                        key={index}
                        title={item.name}
                        description={item.address}
                        onPress={() => navigation.navigate('HomeScreen')}
                    />
                ))}
            </List.Section>
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default SearchScreen;