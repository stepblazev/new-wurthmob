import { StyledText } from '@/components/StyledText';
import { COLORS } from '@/constants/colors';
import { STORAGE_KEYS } from '@/constants/storage-keys';
import { useSideMenu } from '@/stores/side-menu.store';
import { useUser } from '@/stores/user.store';
import { inDev } from '@/utils/functions';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Href, useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

export const SideMenu: React.FC = () => {
    const { isActive, hideMenu } = useSideMenu();
    const { user, logout } = useUser();
    const router = useRouter();

    const linkHandler = (path: Href) => {
         router.navigate(path);
         hideMenu();
    }
    
    const exitHandler = async () => {
        await AsyncStorage.removeItem(STORAGE_KEYS.USER_DATA);
        logout();
        hideMenu();
    }
    
    if (!isActive) return null;
    
    return (
        <View style={[styles.menu]}>
            <StyledText style={styles.title}>Профиль</StyledText>

            {user && (
                <>
                    <View style={styles.user}>
                        <StyledText style={styles.userName}>
                            {user.NAME} {user.LAST_NAME} {user.SECOND_NAME}
                        </StyledText>
                        <StyledText style={styles.userEmail}>{user.EMAIL}</StyledText>
                        <StyledText style={styles.userPhone}>{user.PERSONAL_PHONE}</StyledText>
                        <StyledText style={styles.userCompany}>{user.WORK_COMPANY}</StyledText>
                        <StyledText style={styles.userUnp}>УНП {user.UF_UNP}</StyledText>
                    </View>
                    <View style={styles.debit}>
                        <StyledText style={styles.debitTitle}>Дебиторская задолженность</StyledText>
                        <StyledText style={styles.debitValue}>{user.UF_DEBT ?? 0} руб.</StyledText>
                    </View>
                </>
            )}

            <View style={styles.links}>
                <TouchableOpacity style={styles.link} onPress={() => inDev()}>
                    <Ionicons name="settings" style={styles.linkIcon} />
                    <StyledText style={styles.linkText}>Настройки</StyledText>
                </TouchableOpacity>
                <TouchableOpacity style={styles.link} onPress={() => inDev()}>
                    <Ionicons name="mail" style={styles.linkIcon} />
                    <StyledText style={styles.linkText}>Контакты / Реквизиты</StyledText>
                </TouchableOpacity>
                <TouchableOpacity style={styles.link} onPress={() => inDev()}>
                    <Ionicons name="pricetag" style={styles.linkIcon} />
                    <StyledText style={styles.linkText}>Акции</StyledText>
                </TouchableOpacity>
                <TouchableOpacity style={styles.link} onPress={exitHandler}>
                    <Ionicons name="exit" style={styles.linkIcon} />
                    <StyledText style={styles.linkText}>Выход</StyledText>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    menu: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: COLORS.WHITE,
        padding: 24,
        paddingTop: 72,
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 0 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 6,
        zIndex: 30,
    },
    title: {
        fontSize: 32,
        fontWeight: 800,
        marginBottom: 16,
    },
    user: {
        padding: 12,
        borderWidth: 1,
        borderColor: COLORS.SIDE_MENU_PARTS_BORDER_COLOR,
    },
    userName: {
        fontSize: 16,
        fontWeight: 600,
    },
    userEmail: {
        marginTop: 12,
        fontSize: 16,
        color: COLORS.TEXT_LIGHT,
    },
    userPhone: {
        fontSize: 16,
        color: COLORS.TEXT_LIGHT,
    },
    userCompany: {
        marginTop: 24,
        fontSize: 16,
        color: COLORS.TEXT_LIGHT,
    },
    userUnp: {
        fontSize: 16,
        color: COLORS.TEXT_LIGHT,
    },
    debit: {
        marginTop: 12,
        padding: 12,
        borderWidth: 1,
        borderColor: COLORS.SIDE_MENU_PARTS_BORDER_COLOR,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    debitTitle: {},
    debitValue: {
        fontSize: 18,
        fontWeight: 600,
    },
    links: {
        marginTop: 48,
        gap: 24,
    },
    link: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    linkIcon: {
        fontSize: 20,
    },
    linkText: {
        fontSize: 18,
        fontWeight: 700,
        textTransform: 'uppercase',
    },
});
