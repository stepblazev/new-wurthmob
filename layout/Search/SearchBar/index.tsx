import { COLORS } from '@/constants/colors';
import { useSearch } from '@/stores/search.store';
import { Ionicons } from '@expo/vector-icons';
import { useEffect, useRef } from 'react';
import { Keyboard, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';

export const SearchBar = () => {
    const inputRef = useRef<TextInput>(null);
    const { query, isSearching, setQuery, reset } = useSearch();

    useEffect(() => {
        const listener = Keyboard.addListener('keyboardDidHide', event => {
            inputRef.current?.blur();
            reset();
        });
        return () => listener.remove();
    }, []);

    const resetHandler = () => {
        reset();
        Keyboard.dismiss();
    };

    return (
        <View style={[styles.searchBar]}>
            <Ionicons name="search-outline" style={styles.searchIcon} />
            <TextInput
                ref={inputRef}
                style={[styles.searchInput]}
                value={query}
                onFocus={() => setQuery('')}
                onChangeText={value => setQuery(value)}
                placeholder="Поиск по каталогу"
            />
            {query && (
                <TouchableOpacity style={styles.searchReset} onPress={resetHandler}>
                    <Ionicons name="close-outline" size={24} color={COLORS.SEARCH_BORDER} />
                </TouchableOpacity>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    searchBar: {
        padding: 8,
        backgroundColor: COLORS.WHITE,
        zIndex: 20
    },
    searchIcon: {
        position: 'absolute',
        left: 18,
        top: 15,
        color: COLORS.SEARCH_BORDER,
        fontSize: 24,
        pointerEvents: 'none',
    },
    searchInput: {
        paddingVertical: 8,
        paddingHorizontal: 12,
        paddingLeft: 42,
        borderWidth: 1,
        borderColor: COLORS.SEARCH_BORDER,
        borderRadius: 4,
    },
    searchReset: {
        height: '100%',
        aspectRatio: 1,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        right: 8,
        top: 8,
        zIndex: 3,
    },
});
