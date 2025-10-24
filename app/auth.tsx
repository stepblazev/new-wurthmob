import { StyledText } from '@/components/StyledText';
import { COLORS } from '@/constants/colors';
import { LoginForm } from '@/layout/Forms/Login';
import { FC } from 'react';
import { Image, StyleSheet, View } from 'react-native';

const Auth: FC = () => {
    return (
        <View style={styles.container}>
            <Image source={require('@/assets/logo.png')} style={{ marginTop: -120, width: 250, height: 50 }}  />
            <StyledText style={{ marginTop: 120, marginBottom: 24, fontSize: 24, fontWeight: 700 }}>Авторизация</StyledText>
            <View style={{ width: 260 }}>
                <LoginForm />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.WHITE,
    },
});

export default Auth;
