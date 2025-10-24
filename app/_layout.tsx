import { COLORS } from '@/constants/colors';
import { Gloader } from '@/layout/Gloader';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

SplashScreen.preventAutoHideAsync();
SplashScreen.setOptions({
    duration: 1000,
    fade: true,
});

export default function RootLayout() {
    useEffect(() => {
        SplashScreen.hide();
    }, []);

    return (
        <>
            <StatusBar barStyle={'dark-content'} />
            <Gloader />
            <View style={[styles.unsafeBackground, styles.unsafeBackgroundTop]} />
            <View style={[styles.unsafeBackground, styles.unsafeBackgroundBottom]} />
            <SafeAreaView style={styles.safeArea}>
                <Stack screenOptions={{ headerShown: false }} />
            </SafeAreaView>
        </>
    );
}

const styles = StyleSheet.create({
    unsafeBackground: {
        position: 'absolute',
        left: 0,
        right: 0,
        height: 100,
        zIndex: 0,
    },
    unsafeBackgroundTop: {
        top: 0,
        backgroundColor: COLORS.WHITE,
    },
    unsafeBackgroundBottom: {
        bottom: 0,
        backgroundColor: COLORS.WHITE,
    },
    safeArea: {
        flex: 1,
    },
});
