/**
 * @description
 * Тип, представляющий функцию-предикат.
 * @example
 * const isNum: Predicate<number> = (arg) => typeof arg === 'number';
 */
type Predicate<T> = (arg: T) => boolean
