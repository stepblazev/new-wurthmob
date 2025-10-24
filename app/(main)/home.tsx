import { StyledButton } from '@/components/StyledButton';
import { StyledText } from '@/components/StyledText';
import { useUser } from '@/stores/user.store';
import { useRouter } from 'expo-router';
import { StyleSheet, View } from 'react-native';

export default function Home() {
    const router = useRouter();
    const userStore = useUser();

    return (
        <View style={styles.container}>
            {userStore.isAuthenticated && (
                <>
                    <StyledText>{userStore.user?.EMAIL}</StyledText>
                    <StyledText>{userStore.user?.NAME}</StyledText>
                    <StyledText>{userStore.user?.LAST_NAME}</StyledText>
                    <StyledText>{userStore.user?.SECOND_NAME}</StyledText>
                    <StyledText>{userStore.user?.PERSONAL_PHONE}</StyledText>
                    <StyledText>{userStore.user?.WORK_COMPANY}</StyledText>
                    <StyledText>УНП {userStore.user?.UF_UNP}</StyledText>
                </>
            )}
            <StyledButton label="Выйти" icon="exit" onPress={() => router.replace('/auth')} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
    },
});
