import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.setOptions({
    duration: 3000,
    fade: true,
});

export default function RootLayout() {
    return <Stack screenOptions={{ headerShown: false }} />;
}
