import React from 'react';
import { Image } from 'react-native';
import { Text, useTheme } from 'react-native-paper';

const data = [
    {
        image: <Image source={require('../../assets/onboarding/ob1.png')} style={{ width: 300, height: 300 }} />,
        title: <Text variant='displayMedium'>Đặt vé dễ dàng</Text>,
        subtitle:
            <Text variant='bodyLarge' style={{ width: '90%', marginTop: 10 }}>Không còn lo lắng về việc tìm tuyến xe phù hợp hay bối rối với biểu đồ thời gian xe nữa. Tiết kiệm thời gian và công sức cho việc di chuyển hàng ngày của bạn.</Text>,
    },
    {
        image: <Image source={require('../../assets/onboarding/ob2.png')} style={{ width: 300, height: 290 }} />,
        title: <Text variant='displayMedium'>Bảo mật thông tin</Text>,
        subtitle:
            <Text variant='bodyLarge' style={{ width: '90%', marginTop: 10 }}>Tất cả các thông tin của bạn (đúng rồi đấy, là tất cả!) luôn được giữ an toàn bằng những tiêu chuẩn bảo mật tối tân nhất. Không phải lo sợ điều gì nữa cả!</Text>,
    },
    {
        image: <Image source={require('../../assets/onboarding/ob3.png')} style={{ width: 300, height: 200 }} />,
        title: <Text variant='displayMedium'>CSKH 24/7</Text>,
        subtitle:
            <Text variant='bodyLarge' style={{ width: '90%', marginTop: 10 }}>Chúng tôi luôn đề cao trải nghiệm của bạn. Có bất kì vấn đề gì? Lắc thiết bị của bạn trong khi sử dụng ứng dụng để gửi nhanh phản hồi!</Text>,
    },
];

export default data;
