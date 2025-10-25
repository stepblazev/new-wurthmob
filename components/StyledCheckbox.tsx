import { COLORS } from '@/constants/colors';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { StyledText } from './StyledText';

type StyledCheckboxProps = TouchableOpacityProps & {
    label?: string;
    checked: boolean;
    onCheck: () => void;
};

export const StyledCheckbox: React.FC<StyledCheckboxProps> = ({ label, checked, onCheck, style, ...props }) => {
    return (
        <TouchableOpacity onPress={onCheck} style={[styles.container, style]} {...props}>
            <Ionicons
                name={checked ? 'checkbox' : 'square-outline'}
                style={[styles.icon]}
                color={checked ? COLORS.CHECKBOX_ACTIVE : COLORS.CHECKBOX_EMPTY}
            />
            {label && <StyledText style={styles.label}>{label}</StyledText>}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    icon: {
        fontSize: 20,
    },
    label: {},
});
