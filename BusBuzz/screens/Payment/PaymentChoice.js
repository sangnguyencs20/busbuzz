import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Button, Text, IconButton } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';

const paymentCard = (paymentName, partner) => {
    return (
        <Card style={styles.cardContainer}>
            <View style={styles.cardContent}>
                <View style={styles.cardLeft}>
                    <Text style={styles.cardText}>{paymentName}</Text>
                </View>
                <View style={styles.cardRight}>
                    {partner ? <Icon name='verified' size={30} /> : null}
                </View>
            </View>
        </Card>
    )


}

const PaymentChoice = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.container}>
            <IconButton style={styles.goBack} icon='arrow-left' size={30} />
            <View style={styles.title}>
                <Text style={styles.titleText}>Chọn phương thức thanh toán</Text>
            </View>
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: '#fff',
        alignItems: 'center',
    },
    goBack: {
        position: 'absolute',
        top: 30,
        left: 5,
    },
    title: {
        marginTop: 30,
        marginBottom: 30,
    },
    titleText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
});


export default PaymentChoice;

// import React from 'react';
// import { Card, Avatar, IconButton } from 'react-native-paper';
// import { StyleSheet } from 'react-native';

// function PaymentCard({ paymentName, partner = false }) {
//   const imageUri = require('../../assets/payment/momo.png');

//   const renderPartnerIcon = () => {
//     if (partner) {
//       return (
//         <IconButton
//           icon="verified"
//           color="#3c8dbc"
//           size={20}
//         />
//       );
//     }
//     return null;
//   };

//   return(
//     <Card style={styles.card}>
//       <Card.Title
//         title={paymentName}
//         left={() => <Avatar.Image size={50} source={{ uri: imageUri }} />}
//         right={renderPartnerIcon}
//       />
//     </Card>
//   );
// }

// const styles = StyleSheet.create({
//   card: {
//     width: '90%',
//     aspectRatio: 4 / 1,
//     alignSelf: 'center',
//     borderRadius: 10,
//     elevation: 4,
//     marginBottom: 10,
//   },
// });

// export default PaymentCard;