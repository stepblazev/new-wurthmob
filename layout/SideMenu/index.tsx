import { StyledText } from '@/components/StyledText';
import { COLORS } from '@/constants/colors';
import { STORAGE_KEYS } from '@/constants/storage-keys';
import { IconNames } from '@/core/types';
import { useSideMenu } from '@/stores/side-menu.store';
import { useUser } from '@/stores/user.store';
import { inDev } from '@/utils/functions';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, TouchableOpacity, View } from 'react-native';
import Animated, { Easing, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

interface ISideMenuLink {
    icon?: IconNames;
    label: string;
    handler: () => void;
}

const { width } = Dimensions.get('window');

export const SideMenu: React.FC = () => {
    const { isActive, hideMenu } = useSideMenu();
    const { user, logout } = useUser();

    const translateX = useSharedValue(width);

    useEffect(() => {
        translateX.value = withTiming(isActive ? 0 : width, { duration: 600, easing: Easing.out(Easing.exp) });
    }, [isActive]);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: translateX.value }],
    }));

    const exitHandler = async () => {
        await AsyncStorage.removeItem(STORAGE_KEYS.USER_DATA);
        logout();
        hideMenu();
    };

    const [links, setLinks] = useState<ISideMenuLink[]>([
        { icon: 'settings', label: 'Настройки', handler: () => inDev() },
        { icon: 'mail', label: 'Контакты / Реквизиты', handler: () => inDev() },
        { icon: 'pricetag', label: 'Акции', handler: () => inDev() },
        { icon: 'exit', label: 'Выход', handler: exitHandler },
    ]);

    return (
        <Animated.View style={[styles.menu, animatedStyle]}>
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
                {links.map((link, i) => {
                    const delay = i * 100;

                    return (
                        <Animated.View key={link.label}>
                            <TouchableOpacity style={styles.link} onPress={link.handler}>
                                {link.icon && <Ionicons name={link.icon} style={styles.linkIcon} />}
                                <StyledText style={styles.linkText}>{link.label}</StyledText>
                            </TouchableOpacity>
                        </Animated.View>
                    );
                })}
            </View>
        </Animated.View>
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
        alignItems: 'flex-start',
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
