import { ToastAndroid } from 'react-native';

export function inDev(): void {
    ToastAndroid.show('Функция в разработке', ToastAndroid.BOTTOM);
}

export function sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export function stripTags(html: string): string {
    return html.replace(/<\/?[^>]+(>|$)/g, '');
}

export function formatPrice(value: number): string {
    return new Intl.NumberFormat('ru-RU', {
        style: 'currency',
        currency: 'BYN',
        minimumFractionDigits: 2,
    }).format(value);
}
