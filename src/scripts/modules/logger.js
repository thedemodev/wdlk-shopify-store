//-- The function takes either log or error as property
//-- Any other type will be ignored by the script.
export default function logger (logProp = 'log', message) {
    const DATE = new Date()
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
