import { COLORS } from "@/constants/colors";
import { StyleSheet, Text, TextProps } from "react-native";

type StyledTextProps = TextProps;

export const StyledText: React.FC<StyledTextProps> = ({ style, ...props }) => {
    return <Text style={[styles.base, style]} {...props} />
}

const styles = StyleSheet.create({
    base: {
        color: COLORS.TEXT_DARK,
    }
});