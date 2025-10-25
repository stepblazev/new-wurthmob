import { useSearch } from '@/stores/search.store';
import { StyleSheet, View } from 'react-native';
import { SearchBar } from './SearchBar';
import { SearchResult } from './SearchResult';

export const Search = () => {
    const { isSearching } = useSearch();

    return (
        <View style={[styles.container, isSearching ? { top: 0 } : null]}>
            <SearchBar />
            <SearchResult />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 10
    },
});
