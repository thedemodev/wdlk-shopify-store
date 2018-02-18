
export default function logger(logProp: string = 'log', message: string): void {
    const DATE = new Date();
    if (typeof console !== 'undefined' &&
        logProp === 'log' ||
        logProp === 'error') {
            if (logProp === 'error') {
                console.error(`${DATE}: ${message}`);
            } else {
                console.log(`${DATE}: ${message}`);
            }
    }
}
