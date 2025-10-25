import { COLORS } from '@/constants/colors';
import { STORAGE_KEYS } from '@/constants/storage-keys';
import { Gloader } from '@/layout/Gloader';
import { useUser } from '@/stores/user.store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Stack, useRouter } from 'expo-router';
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
    const router = useRouter();

    useEffect(() => {
        const initUser = async () => {
            const userJson = await AsyncStorage.getItem(STORAGE_KEYS.USER_DATA);
            
            if (userJson) {
                const userData = JSON.parse(userJson);
                useUser.getState().login(userData);
                router.replace('/');
            } else {
                router.replace('/auth/login');
            }
            SplashScreen.hide();
        };

        initUser();
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
