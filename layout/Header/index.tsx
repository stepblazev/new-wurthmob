import { Logo } from "@/components/svg/Logo";
import { COLORS } from "@/constants/colors";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Path, Svg } from 'react-native-svg';

export const Header = () => {
    return <View style={styles.container}>
        <TouchableOpacity style={styles.logo}>
            <Logo />
        </TouchableOpacity>
        <TouchableOpacity style={styles.burger}>
            <Svg width="24" height="12" viewBox="0 0 16 12" fill={COLORS.PRIMARY}>
              <Path
                d="M872,958h-8a1,1,0,0,1-1-1h0a1,1,0,0,1,1-1h8a1,1,0,0,1,1,1h0A1,1,0,0,1,872,958Zm6-5H864a1,1,0,0,1,0-2h14A1,1,0,0,1,878,953Zm0-5H864a1,1,0,0,1,0-2h14A1,1,0,0,1,878,948Z"
                transform="translate(-863 -946)"></Path>
            </Svg>
        </TouchableOpacity>
    </View>
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        flexDirection: 'row',
        alignItems: 'stretch',
        justifyContent: 'space-between',
        backgroundColor: COLORS.WHITE,
    },
    logo: {
        width: 125,
        height: 30,
    },
    burger: {
        width: 32,
        height: 32,
        alignItems: 'center',
        justifyContent: 'center',
    },
});