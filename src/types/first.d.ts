/**
 * @description
 * Тип, позволяющий получить тип первого элемента массива или строки **S**.
 * @example
 * const a: First<'abc'> = 'a';
 * const one: First<[1, 2, 3]> = 1;
 */
type First<S extends string | any[]> = S extends `${infer Head}${string}`
    ? Head
    : S extends [infer Head, ...unknown[]]
    ? Head
    : never
