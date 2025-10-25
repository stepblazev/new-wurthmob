import { StyledText } from '@/components/StyledText';
import { COLORS } from '@/constants/colors';
import { Ionicons } from '@expo/vector-icons';
import { Href, useRouter } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

interface MenuLink {
    href: Href;
    label: string;
    icon: React.ComponentProps<typeof Ionicons>['name'];
}

export const Menu = () => {
    const router = useRouter();

    const [links, setLinks] = useState<MenuLink[]>([
        { href: '/home', icon: 'home-outline', label: 'Главная' },
        { href: '/catalog', icon: 'search-outline', label: 'Каталог' },
        { href: '/cart', icon: 'cart-outline', label: 'Корзина' },
        { href: '/favorites', icon: 'heart-outline', label: 'Избранное' },
        { href: '/profile', icon: 'person-outline', label: 'Профиль' },
    ]);

    return (
        <View style={styles.menu}>
            {links.map(link => (
                <TouchableOpacity
                    key={link.icon}
                    style={[styles.link, { width: `${100 / links.length}%` }]}
                    onPress={() => router.push(link.href)}
                >
                    <Ionicons name={link.icon} style={styles.linkIcon} />
                    <StyledText style={styles.linkLabel}>{link.label}</StyledText>
                </TouchableOpacity>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    menu: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        flexDirection: 'row',
        alignItems: 'stretch',
        backgroundColor: COLORS.PRIMARY,
    },
    link: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    linkIcon: {
        fontSize: 28,
        color: COLORS.WHITE,
    },
    linkLabel: {
        fontSize: 12,
        color: COLORS.WHITE,
    },
});
