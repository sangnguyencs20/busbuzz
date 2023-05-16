import React from 'react';
import Onboarding from 'react-native-onboarding-swiper';
import { Button, useTheme } from 'react-native-paper';

import data from './data';

const Next = ({ ...props }) => (
    <Button mode="contained" {...props} style={{ marginHorizontal: 15 }}>Tiếp theo</Button>
);

const Skip = ({ ...props }) => (
    <Button mode="contained-tonal" {...props} style={{ marginHorizontal: 15 }}>Bỏ qua</Button>
);

const Done = ({ ...props }) => (
    <Button mode="contained" {...props} style={{ marginHorizontal: 15 }}>Bắt đầu nào!</Button>
);

const OnboardingScreen = ({ navigation }) => {
    const theme = useTheme();
    return (
        <Onboarding
            onSkip={() => navigation.navigate("LoginScreen")}
            onDone={() => navigation.navigate("LoginScreen")}
            controlStatusBar={false}
            bottomBarColor={theme.colors.background}
            NextButtonComponent={Next}
            SkipButtonComponent={Skip}
            DoneButtonComponent={Done}
            pages={data.map((item) => ({
                ...item,
                backgroundColor: theme.colors.background,
            }))}
        />
    )
};

export default OnboardingScreen;
