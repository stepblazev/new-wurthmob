export function stripTags(html: string): string {
    return html.replace(/<\/?[^>]+(>|$)/g, '');
}

export function sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
