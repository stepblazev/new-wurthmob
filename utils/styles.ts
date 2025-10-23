export function padding(a: number, b?: number, c?: number, d?: number) {
    return {
        paddingTop: a,
        paddingRight: b ?? a,
        paddingBottom: c ?? a,
        paddingLeft: d ?? b ?? a,
    };
}

export function margin(a: number, b?: number, c?: number, d?: number) {
    return {
        marginTop: a,
        marginRight: b ?? a,
        marginBottom: c ?? a,
        marginLeft: d ?? b ?? a,
    };
}
