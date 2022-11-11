/**
 * @description
 * Тип, позволяющий исключить из параметра **Arr** тип его последнего элемента.
 * @example
 * type Three = [1, 2, 3];
 * const two: Pop<Three> = [1, 2];
 */
type Pop<Arr extends any[]> = Arr extends [...infer U, unknown] ? U : []
