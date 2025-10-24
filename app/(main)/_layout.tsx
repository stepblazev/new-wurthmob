import { COLORS } from '@/constants/colors';
import { Header } from '@/layout/Header';
import { Menu } from '@/layout/Menu';
import { Slot } from 'expo-router';
import { StyleSheet, View } from 'react-native';

export default function MainLayout() {
    return (
        <>
            <Header />
            <View style={styles.body}>
                <Slot />
            </View>
            <Menu />
        </>
    );
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.WHITE,
    },
});
