export const trimSlashes = str => {
    let newstr;
    if (typeof str === 'string') {
        newstr = str.replace(/^\/|\/$/g, '')
    }
    return newstr
}