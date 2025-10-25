import { COLORS } from '@/constants/colors';
import { Header } from '@/layout/Header';
import { Menu } from '@/layout/Menu';
import { SideMenu } from '@/layout/SideMenu';
import { useUser } from '@/stores/user.store';
import { Slot, useRouter } from 'expo-router';
import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';

export default function MainLayout() {
    const router = useRouter();
    const { isAuthenticated } = useUser();
    
    useEffect(() => {
        if (!isAuthenticated) {
            router.navigate('/auth/login');
        }
    }, [router, isAuthenticated]);
    
    return (
        <>
            <Header />
            <SideMenu />
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
        backgroundColor: COLORS.PAGE_BACKGROUND,
    },
});
