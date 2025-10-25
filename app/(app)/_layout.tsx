import { COLORS } from '@/constants/colors';
import { Header } from '@/layout/Header';
import { Menu } from '@/layout/Menu';
import { SearchBar } from '@/layout/SearchBar';
import { SideMenu } from '@/layout/SideMenu';
import { useUser } from '@/stores/user.store';
import { Redirect, Slot } from 'expo-router';
import { StyleSheet, View } from 'react-native';

export default function MainLayout() {
    const { isAuthenticated } = useUser();

    if (!isAuthenticated) {
        return <Redirect href="/auth/login" />;
    }
    
    return (
        <>
            <Header />
            <SideMenu />
            <View style={styles.body}>
                <Slot />
                <SearchBar />
            </View>
            <Menu />
        </>
    );
}

const styles = StyleSheet.create({
    body: {
        position: 'relative',
        flex: 1,
        alignItems: 'stretch',
        justifyContent: 'center',
        backgroundColor: COLORS.PAGE_BACKGROUND,
    },
});
