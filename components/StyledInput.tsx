import { COLORS } from '@/constants/colors';
import { StyleSheet, TextInput, TextInputProps, View } from 'react-native';
import { StyledText } from './StyledText';

type StyledInputProps = TextInputProps & {
    errorMessage?: string;
};

export const StyledInput: React.FC<StyledInputProps> = ({ errorMessage, style, ...props }) => {
    return (
        <View>
            <TextInput style={[styles.base, style]} {...props} />
            {errorMessage && <StyledText style={styles.error}>{errorMessage}</StyledText>}
        </View>
    )
};

const styles = StyleSheet.create({
    base: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: COLORS.TEXT_INPUT_BORDER,
        backgroundColor: COLORS.TEXT_INPUT_BG
    },
    error: {
        marginTop: 2,
        textAlign: 'right',
        color: COLORS.DANGER,
        fontSize: 12
    },
});
