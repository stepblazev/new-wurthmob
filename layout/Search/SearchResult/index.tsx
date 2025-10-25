import { StyledText } from '@/components/StyledText';
import { COLORS } from '@/constants/colors';
import HttpApi from '@/core/http-api';
import useDebounce from '@/hooks/use-debounce';
import { useSearch } from '@/stores/search.store';
import { useUser } from '@/stores/user.store';
import { useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

export const SearchResult = () => {
    const { query, isSearching } = useSearch();
    const debounceQuery = useDebounce<string>(query, 600);
    const { user } = useUser();

    const [products, setProducts] = useState<any[]>([]);

    const fetchProducts = async () => {
        const response = await HttpApi.get('/catalog/searchProducts.php', {
            params: {
                idSection: null,
                idUser: user?.ID,
                page: 1,
                searchQuery: query,
            },
        });
        setProducts(response.data);
    };

    useEffect(() => {
        if (query.length > 0) {
            // fetchProducts();
        }
    }, [debounceQuery]);

    return (
        <View style={[styles.container, isSearching ? { flex: 1 } : null]}>
            {isSearching && !products.length && (
                <View style={styles.placeholder}>
                    <StyledText style={styles.placeholderText}>Здесь будет результат поиска</StyledText>
                </View>
            )}
            {isSearching && (
                <ScrollView style={styles.products}>
                    {products.map(product => {
                        return (
                            <TouchableOpacity key={product.ID} style={styles.product}>
                                <View style={{ width: '30%' }}>
                                    <Image
                                        style={{ width: '100%', height: 70 }}
                                        source={{
                                            uri: `https://wuerth.by${product.DETAIL_PICTURE_URL}`,
                                        }}
                                    />
                                </View>
                                <View style={styles.productInfo}>
                                    <StyledText>{product.NAME}</StyledText>
                                    <StyledText>Арт. {product.CML2_ARTICLE}</StyledText>
                                </View>
                            </TouchableOpacity>
                        );
                    })}
                </ScrollView>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.SEARCH_RESULT_BACKGROUND,
    },
    placeholder: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    placeholderText: {
        color: COLORS.TEXT_LIGHT,
    },
    products: {
        paddingHorizontal: 8
    },
    product: {
        marginTop: 8,
        padding: 8,
        borderWidth: 1,
        borderColor: COLORS.LIGHT,
        flexDirection: 'row',
        alignItems: 'stretch',
        gap: 24,
    },
    productInfo: {},
});
