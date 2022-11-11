/**
 * @description
 * Тип, позволяющий получить тип последнего элемента массива или строки **S**.
 * @example
 * const a: Last<'abc'> = 'c';
 * const three: Last<[1, 2, 3]> = 3;
 */
type Last<S extends string | any[]> = S extends string
    ? Last<Split<S, Chars['EmptyStr']>>
    : S extends [...unknown[], infer Last]
    ? Last
    : never
