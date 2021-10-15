/*
 * @Author: Chris 
 * @Date: 2021-04-28 18:24:38 
 * @Last Modified by: Chris
 * @Last Modified time: 2021-04-29 09:52:27
 * 作用： 对象的深层属性获取
 */
 
const stringToPath = memoizeCapped((string) => {

    const charCodeOfDot = '.'.charCodeAt(0)
    const reEscapeChar = /\\(\\)?/g
    const rePropName = RegExp(
        // Match anything that isn't a dot or bracket.
        '[^.[\\]]+' + '|' +
        // Or match property names within brackets.
        '\\[(?:' +
        // Match a non-string expression.
        '([^"\'][^[]*)' + '|' +
        // Or match strings (supports escaping characters).
        '(["\'])((?:(?!\\2)[^\\\\]|\\\\.)*?)\\2' +
        ')\\]' + '|' +
        // Or match "" as the space between consecutive dots or empty brackets.
        '(?=(?:\\.|\\[\\])(?:\\.|\\[\\]|$))'
        , 'g')



    const result = []
    if (string.charCodeAt(0) === charCodeOfDot) {
        result.push('')
    }
    string.replace(rePropName, (match, expression, quote, subString) => {
        let key = match
        if (quote) {
            key = subString.replace(reEscapeChar, '$1')
        }
        else if (expression) {
            key = expression.trim()
        }
        result.push(key)
    })
    return result
})



function baseGet(object, path) {
    path = castPath(path, object)

    let index = 0
    const length = path.length

    while (object != null && index < length) {
        object = object[toKey(path[index++])]
    }
    return (index && index == length) ? object : undefined
}

function toKey(value) {
    const INFINITY = 1 / 0

    if (typeof value === 'string' || isSymbol(value)) {
        return value
    }
    const result = `${value}`
    return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result
}





function castPath(value, object) {
    if (Array.isArray(value)) {
        return value
    }
    return isKey(value, object) ? [value] : stringToPath(value)
}



function isKey(value, object) {
    const reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/
    const reIsPlainProp = /^\w*$/

    if (Array.isArray(value)) {
        return false
    }
    const type = typeof value
    if (type === 'number' || type === 'boolean' || value == null || isSymbol(value)) {
        return true
    }
    return reIsPlainProp.test(value) || !reIsDeepProp.test(value) ||
        (object != null && value in Object(object))
}

function isSymbol(value) {
    const type = typeof value
    return type == 'symbol' || (type === 'object' && value != null && getTag(value) == '[object Symbol]')
}

function getTag(value) {
    if (value == null) {
        return value === undefined ? '[object Undefined]' : '[object Null]'
    }
    return Object.prototype.toString.call(value)
}

function memoizeCapped(func) {
    const MAX_MEMOIZE_SIZE = 500 //最深层级

    const result = memoize(func, (key) => {
        const { cache } = result
        if (cache.size === MAX_MEMOIZE_SIZE) {
            cache.clear()
        }
        return key
    })

    return result
}



function memoize(func, resolver) {
    if (typeof func !== 'function' || (resolver != null && typeof resolver !== 'function')) {
        throw new TypeError('Expected a function')
    }
    const memoized = function (...args) {
        const key = resolver ? resolver.apply(this, args) : args[0]
        const cache = memoized.cache

        if (cache.has(key)) {
            return cache.get(key)
        }
        const result = func.apply(this, args)
        memoized.cache = cache.set(key, result) || cache
        return result
    }
    memoized.cache = new (memoize.Cache || Map)
    return memoized
}
memoize.Cache = Map




export function get(object, path, defaultValue) {
    const result = object == null ? undefined : baseGet(object, path)
    return result === undefined ? defaultValue : result
}
