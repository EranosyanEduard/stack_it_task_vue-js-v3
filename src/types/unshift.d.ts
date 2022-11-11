/**
 * @description
 * Тип, позволяющий добавить в параметр **Arr** тип его первого элемента.
 * @example
 * type Two = [2, 3];
 * const three: Unshift<Two, 1> = [1, 2, 3];
 */
type Unshift<Arr extends any[], First> = [First, ...Arr]
