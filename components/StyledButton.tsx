import { COLORS } from '@/constants/colors';
import { IconNames } from '@/core/types';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { StyledText } from './StyledText';

type StyledButtonType = 'primary' | 'secondary';

type StyledButtonProps = TouchableOpacityProps & {
    type?: StyledButtonType;
    label?: string;
    icon?: IconNames;
    iconSize?: number;
};

export const StyledButton: React.FC<StyledButtonProps> = ({ type = "primary", label, icon, iconSize, style, ...props }) => {
    let backgroundColor, textColor;
    
    switch (type) {
        case "primary":
            backgroundColor = COLORS.PRIMARY_BUTTON_BG;
            textColor = COLORS.PRIMARY_BUTTON_TEXT;
            break;
        case "secondary":
            backgroundColor = COLORS.SECONDARY_BUTTON_BG;
            textColor = COLORS.SECONDARY_BUTTON_TEXT;
            break;
    }

    return (
        <TouchableOpacity style={[styles.base, { backgroundColor }, style]} {...props}>
            {icon && <Ionicons name={icon} style={[styles.icon, { color: textColor, fontSize: iconSize ?? 16 }]} />}
            {label && <StyledText style={[styles.text, { color: textColor }]}>{label}</StyledText>}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    base: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        gap: 8,
        borderRadius: 4,
    },
    text: {
        fontWeight: 600,
    },
    icon: {},
});
