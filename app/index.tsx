import { StyledButton } from '@/components/StyledButton';
import { StyledText } from '@/components/StyledText';
import { Colors } from '@/constants/ui';
import { Header } from '@/layout/Header';
import { Menu } from '@/layout/Menu';
import { Dimensions, StatusBar, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { height } = Dimensions.get('window');

export default function Index() {
    return (
        <>
            <StatusBar barStyle={'dark-content'} />
            <View style={[styles.unsafeBackground, styles.unsafeBackgroundTop]} />
            <View style={[styles.unsafeBackground, styles.unsafeBackgroundBottom]} />
            <SafeAreaView style={styles.safeArea}>
                <Header />
                <View style={styles.body}>
                    <StyledText>Edit app/index.tsx to edit this screen.</StyledText>
                    <StyledButton label='В корзину' style={{marginTop: 24}} icon='cart-sharp' />
                </View>
                <Menu />
            </SafeAreaView>
        </>
    );
}

const styles = StyleSheet.create({
    unsafeBackground: {
        position: 'absolute',
        left: 0,
        right: 0,
        height: height / 2,
        zIndex: 0
    },
    unsafeBackgroundTop: {
        top: 0,
        backgroundColor: Colors.white,
    },
    unsafeBackgroundBottom: {
        bottom: 0,
        backgroundColor: Colors.primary,
    },
    safeArea: {
        flex: 1,
    },
    body: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.white
    },
});
