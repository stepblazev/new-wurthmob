import { Logo } from "@/components/svg/Logo";
import { COLORS } from "@/constants/colors";
import { useSideMenu } from "@/stores/side-menu.store";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { StyleSheet, TouchableOpacity, View } from "react-native";

export const Header = () => {
    const router = useRouter();
    const { isActive, showMenu, hideMenu } = useSideMenu();
    
    const menuHandler = () => {
        if (isActive) {
            hideMenu();
        } else {
            showMenu();
        }
    }
    
    const logoHandler = () => {
        router.navigate('/home');
        hideMenu();
    }
    
    return <View style={styles.container}>
        <TouchableOpacity style={styles.logo} onPress={logoHandler}>
            <Logo />
        </TouchableOpacity>
        <TouchableOpacity style={styles.menu} onPress={menuHandler}>
            <Ionicons name={isActive ? "close" : "menu"} size={30} color={COLORS.BURGER_MENU_BUTTON} />
        </TouchableOpacity>
    </View>
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: COLORS.WHITE,
        elevation: 10,
        zIndex: 50
    },
    logo: {
        width: 125,
        height: 30,
    },
    menu: {
    },
});