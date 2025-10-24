import { StyledText } from '@/components/StyledText';
import { COLORS } from '@/constants/colors';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

interface MenuLink {
    href: string;
    label: string;
    icon: React.ComponentProps<typeof Ionicons>["name"];
}

export const Menu = () => {
    const [links, setLinks] = useState<MenuLink[]>([
        { href: '/home', icon: 'home-outline', label: 'Главная' },
        { href: '/search', icon: 'search-outline', label: 'Каталог' },
        { href: '/cart', icon: 'cart-outline', label: 'Корзина' },
        { href: '/heart', icon: 'heart-outline', label: 'Избранное' },
        { href: '/person', icon: 'person-outline', label: 'Профиль' },
    ]);

    return (
        <View style={styles.menu}>
            {links.map(link => (
                <TouchableOpacity key={link.href} style={[styles.link, { width: `${100 / links.length}%` }]}>
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
