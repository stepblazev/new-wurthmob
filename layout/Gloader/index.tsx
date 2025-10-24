import { StyledText } from '@/components/StyledText';
import { COLORS } from '@/constants/colors';
import { useGloader } from '@/stores/gloader.store';
import { ActivityIndicator, Dimensions, StyleSheet, View } from 'react-native';

const { width, height } = Dimensions.get('window');

export const Gloader: React.FC = () => {
    const { isLoading, message } = useGloader();

    if (!isLoading) return null;

    return (
        <View style={styles.wrapper}>
            <View style={styles.window}>
                <ActivityIndicator size="large" color={COLORS.PRIMARY} />
                <StyledText>{message}</StyledText>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        position: 'absolute',
        top: 0,
        left: 0,
        width,
        height,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999,
        backdropFilter: 'blur(4px)'
    },
    window: {
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 8,
        minWidth: 150,
        maxWidth: '80%',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        gap: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
});
