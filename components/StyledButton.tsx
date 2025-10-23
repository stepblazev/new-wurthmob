import { Colors } from '@/constants/ui';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { StyledText } from './StyledText';

type StyledButtonProps = TouchableOpacityProps & {
    label?: string;
    icon?: React.ComponentProps<typeof Ionicons>["name"];
    iconSize?: number;
};

export const StyledButton: React.FC<StyledButtonProps> = ({ label, icon, iconSize, style, ...props }) => {
    return (
        <TouchableOpacity style={[styles.base, style]} {...props}>
            {icon && <Ionicons name={icon} style={[styles.icon, { fontSize: iconSize ?? 16 }]} />}
            {label && <StyledText style={styles.text}>{label}</StyledText>}
        </TouchableOpacity>
    )
};

const styles = StyleSheet.create({
    base: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        gap: 8,
        backgroundColor: Colors.primary,
        borderRadius: 4
    },
    text: {
        color: Colors.white,
    },
    icon: {
        color: Colors.white,
    }
});
