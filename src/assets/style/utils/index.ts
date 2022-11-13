/**
 * Создать объект, ключами которого являются элементы массива **keys**, а
 * значениями - значения, которые возвращает ф-я **map** для таких ключей.
 * @example
 * const obj = createObj(['first', 'second', 'third'], (key) => key.length);
 * console.log(obj); // { first: 5, second: 6, third: 5 }
 *
 * @param keys - Список ключей объекта.
 * @param map - Функция генерации значения.
 */
const createObj = <K extends string, V>(
    keys: readonly K[],
    map: (it: K, idx: number) => V
): Record<K, V> => {
    const ACC: Record<K, V> = {} as any

    return keys.reduce((acc, it, idx) => {
        acc[it] = map(it, idx)
        return acc
    }, ACC)
}

/**
 * Создать строку, представляющую обращение к css-переменной с идентификатором
 * **id**.
 * @param id - Идентификатор css-переменной.
 * @param fallbackValue - Значение, которое будет использовано в случае
 * отсутствия переменной.
 */
const getCssVar = <Id extends string, V extends string = 'initial'>(
    id: Id,
    fallbackValue: V = 'initial' as any
): CssVar<Id, V> => {
    return `var(--${id}, ${fallbackValue})` as any
}

export { createObj, getCssVar }
