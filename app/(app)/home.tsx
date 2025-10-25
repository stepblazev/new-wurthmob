import { StyledText } from '@/components/StyledText';
import { StyleSheet, View } from 'react-native';

export default function Home() {
    return (
        <View style={styles.container}>
            <StyledText style={{ fontSize: 24 }}>Home page</StyledText>
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
