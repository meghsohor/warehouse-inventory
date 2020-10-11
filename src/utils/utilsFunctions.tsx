export function getUUID() {
    // eslint gets funny about bitwise
    /* eslint-disable */
    return 'xyxxxyxyxyxy'.replace(/[xy]/g, c => {
        const piece = (Math.random() * 16) | 0;
        const elem = c === 'x' ? piece : (piece & 0x3) | 0x8;
        return elem.toString(16);
    });
    /* eslint-enable */
}